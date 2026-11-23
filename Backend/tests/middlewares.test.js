process.env.SECRET_KEY = "test-secret";
jest.mock("../models/user.model");

const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middlewares/authMiddleware");
const restrictTo = require("../middlewares/restrictTo");
const globalError = require("../middlewares/globalError");
const AppError = require("../utils/AppError");

describe("AppError", () => {
  test("takes status first, then message", () => {
    const e = new AppError(404, "missing");
    expect([e.status, e.message, e.isOperational]).toEqual([404, "missing", true]);
    expect(e).toBeInstanceOf(Error);
  });
});

describe("auth middleware", () => {
  beforeEach(() => jest.resetAllMocks());

  test("passes a 401 AppError to next when there is no Authorization header", async () => {
    const next = jest.fn();
    await auth({ headers: {} }, {}, next);
    expect(next.mock.calls[0][0].status).toBe(401);
  });

  test("looks up a non-deleted user from the token and attaches it", async () => {
    User.findOne.mockResolvedValue({ _id: "u1", role: "admin" });
    const token = jwt.sign({ _id: "u1", role: "admin" }, "test-secret");
    const req = { headers: { authorization: `Bearer ${token}` } };
    const next = jest.fn();
    await auth(req, {}, next);
    expect(User.findOne).toHaveBeenCalledWith({ isDeleted: false, _id: "u1" });
    expect(req.user.role).toBe("admin");
    expect(next).toHaveBeenCalledWith();
  });
});

describe("restrictTo", () => {
  const call = (role, ...roles) => {
    const next = jest.fn();
    restrictTo(...roles)({ user: { role } }, {}, next);
    return next.mock.calls[0][0];
  };

  test("allows a listed role", () => {
    expect(call("admin", "admin")).toBeUndefined();
  });

  test("403 for a role that is not listed", () => {
    expect(call("user", "admin").status).toBe(403);
  });
});

describe("globalError", () => {
  const run = (err) => {
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    jest.spyOn(console, "log").mockImplementation(() => {});
    globalError(err, {}, res, jest.fn());
    return res;
  };
  afterEach(() => jest.restoreAllMocks());

  test("uses the status and message of an AppError", () => {
    const res = run(new AppError(403, "no"));
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "no" });
  });

  test("falls back to 500", () => {
    expect(run(new Error("x")).status).toHaveBeenCalledWith(500);
  });

  test("maps duplicate key errors to 400 naming the field", () => {
    const e = new Error("dup"); e.code = 11000; e.keyValue = { email: "a@b.com" };
    const res = run(e);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json.mock.calls[0][0].message).toMatch(/email/);
  });

  test("maps invalid JWT to 400", () => {
    const e = new Error("jwt"); e.name = "JsonWebTokenError";
    expect(run(e).status).toHaveBeenCalledWith(400);
  });
});
