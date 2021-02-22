const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

router.use("/users", userRoutes);
// add thoughts that was created in thought-controllers.js
router.use("/thoughts", thoughtRoutes);

module.exports = router;