import Authcontroller from "../Controllers/authController.js"
import express from "express"

const router = express.Router();

router.post("/register", Authcontroller.userRegister)
router.post("/", Authcontroller.login)
// router.post("/forgot-password", undefined)
// router.post("/reset-password", undefined)
router.get('/userhome', Authcontroller.userHome)

export default router; //dsaas