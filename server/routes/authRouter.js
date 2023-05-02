import { Router } from "express"
import AuthController from "../controllers/AuthController.js"
import AuthMiddleware from "../middlewares/authMiddleware.js"

const authRouter = new Router()

authRouter.post('/signUp', AuthController.registration)
authRouter.post('/signIn', AuthController.login)
authRouter.get('/getUsers',AuthMiddleware, AuthController.getAllUsers)
authRouter.get('/history', AuthMiddleware, AuthController.getOpertionsHistory)
authRouter.post('/sendMoneys', AuthController.sendMoneys)

export default authRouter