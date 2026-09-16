const { getAllProducts, createProduct, getDeletedProducts, getStates, getOneProduct, updateProduct, softDeleteProduct, DeleteProduct } = require("../controllers/product.controller")

const router = require("express").Router()


router.route("/").get(getAllProducts).post(createProduct)

router.route("/deleted-products").get(getDeletedProducts)
router.route("/get-states").get(getStates)


router.route("/:id").get(getOneProduct).patch(updateProduct).delete(DeleteProduct)
router.route("/:id/soft-delete").patch(softDeleteProduct)



module.exports = router