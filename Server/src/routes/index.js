const {Router} = require("express")
const controlerUser = require("../controlers/controlerUser")

const router = Router();

router.use("/api/user", controlerUser);

module.exports = router;