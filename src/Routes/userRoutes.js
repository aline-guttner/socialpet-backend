import userController from "../Controllers/userController.js"
import express from "express"

const userRouter = express.Router()

userRouter.get('/', userController.getAllUsers)

userRouter.get('/:id', userController.getOneUser)

userRouter.get('/:id', userController.getOneUser) 

userRouter.patch('/:id', userController.updateUser)

userRouter.delete('/:id', userController.deleteUser)

export default userRouter