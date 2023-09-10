const { Router } = require("express");
const { accessUser, createUser, allUser } = require("../controlers/controlerUser")

const routerUser = Router()

routerUser.get("/", allUser)
routerUser.post("/login", accessUser)
routerUser.post("/createCount", createUser)

module.exports = routerUser