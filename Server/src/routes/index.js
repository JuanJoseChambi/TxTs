const {Router} = require("express")
const controlerUser = require("../controlers/controlerUser")

const router = Router();

router.use("/user", controlerUser);

module.exports = router;