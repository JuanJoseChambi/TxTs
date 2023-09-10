const {Router} = require("express")
const routerUser = require("./routerUser")

const router = Router();

router.use("/api/user", routerUser);

module.exports = router;