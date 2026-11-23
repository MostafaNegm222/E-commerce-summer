const ApiFeatures = require("../utils/ApiFeatures");

// Chainable stand-in for a Mongoose query that records the calls made on it.
function fakeQuery() {
  const calls = [];
  const q = { calls };
  ["find", "sort", "select", "skip", "limit"].forEach((m) => {
    q[m] = (arg) => (calls.push([m, arg]), q);
  });
  return q;
}
const last = (q, name) => q.calls.filter((c) => c[0] === name).pop()[1];

describe("ApiFeatures", () => {
  test("filter turns gt, gte, lt, lte into Mongo operators", () => {
    const q = fakeQuery();
    const f = new ApiFeatures(q, { price: { gte: "100", lte: "500" } }).filter();
    expect(last(q, "find")).toEqual({ price: { $gte: "100", $lte: "500" } });
    expect(f.filterQuery).toEqual({ price: { $gte: "100", $lte: "500" } });
  });

  test("filter ignores sort, search, fields, limit, page and skip", () => {
    const q = fakeQuery();
    new ApiFeatures(q, { sort: "a", search: "b", fields: "c", limit: 1, page: 2, skip: 3, category: "sports" }).filter();
    expect(last(q, "find")).toEqual({ category: "sports" });
  });

  test("search matches name (prefix) and description", () => {
    const q = fakeQuery();
    const f = new ApiFeatures(q, { search: "bal" }).search();
    expect(last(q, "find").$or).toEqual([
      { name: { $regex: "^bal", $options: "i" } },
      { description: { $regex: "bal", $options: "i" } },
    ]);
    expect(f.searchQuery.$or).toHaveLength(2);
  });

  test("search does nothing without a keyword", () => {
    const q = fakeQuery();
    new ApiFeatures(q, {}).search();
    expect(q.calls).toHaveLength(0);
  });

  test("sort defaults to _id and accepts a comma list", () => {
    const a = fakeQuery();
    new ApiFeatures(a, {}).sort();
    expect(last(a, "sort")).toBe("_id");
    const b = fakeQuery();
    new ApiFeatures(b, { sort: "price,-name" }).sort();
    expect(last(b, "sort")).toBe("price -name");
  });

  test("fields hides __v by default and selects the requested fields", () => {
    const a = fakeQuery();
    new ApiFeatures(a, {}).fields();
    expect(last(a, "select")).toBe("-__v");
    const b = fakeQuery();
    new ApiFeatures(b, { fields: "name,price" }).fields();
    expect(last(b, "select")).toBe("name price");
  });

  test("pagination defaults to page 1 with 10 items and computes skip", () => {
    const a = fakeQuery();
    new ApiFeatures(a, {}).pagination();
    expect([last(a, "skip"), last(a, "limit")]).toEqual([0, 10]);
    const b = fakeQuery();
    new ApiFeatures(b, { page: 3, limit: 4 }).pagination();
    expect([last(b, "skip"), last(b, "limit")]).toEqual([8, 4]);
  });
});
