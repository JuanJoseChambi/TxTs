const { Router } = require("express");
const { accessUser, createUser, allUser, update } = require("../controlers/controlerUser")

const routerUser = Router()

routerUser.get("/", allUser)
routerUser.post("/login", accessUser)
routerUser.post("/createAccount", createUser)
routerUser.put("/:id", update)

module.exports = routerUser