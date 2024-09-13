const router = require("express").Router();
const { getDashData } = require("../../controllers/dashboardControllers");
const protected = require("../../middleware/authMiddleware")

router.get("/", protected, getDashData)

module.exports = router;