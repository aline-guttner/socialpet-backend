import petController from "../Controllers/petController.js"
import express from "express"

const petRouter = express.Router()

petRouter.post('/', petController.createPet)

petRouter.get('/:id', petController.getOnePet)

petRouter.patch('/:id', petController.updatePet)

petRouter.delete('/:id', petController.deletePet)

export default petRouter

