const {Router} = require("express");
const routerUser = require("./routerUser");
const routerPost = require("./routerPost");

const router = Router();

router.use("/api/user", routerUser);
router.use("/api/post", routerPost);

module.exports = router;