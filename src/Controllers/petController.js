import Pet from "../models/petModel.js"
import User from "../models/userModel.js"

class petController {
    static createPet = async (req, res) => {
        const pet = await Pet.create(req.body)
        const user = await User.findById(pet.userId)

        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' })
        }

        res.user = user
        res.user.pets = [...user.pets, pet]
        await res.user.save()
        return res.status(200).send({ pet })
    }

    static getOnePet = async (req, res) => {
        try {
            const pet = await Pet.findById(req.params.id)
            if (pet == null) {
                return res.status(404).json({ message: 'Cannot find pet' })

            }
            res.send(pet)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static updatePet = async (req, res) => {
        let pet
        let user
        try {
            pet = await Pet.findById(req.params.id)
            if (pet == null) {
                return res.status(404).json({ message: 'Cannot find pet' })
            }

            user = await User.findById(pet.userId)
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' })
            }

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        res.user = user
        let petIndex = user.pets.findIndex(animal => animal.id == pet.id)
        res.pet = pet

        if (req.body.petName != null) {
            res.pet.petName = req.body.petName
        }
        if (req.body.petType != null) {
            res.pet.petType = req.body.petType
        }
        if (req.body.petImg != null) {
            res.pet.petImg = req.body.petImg
        }

        res.user.pets = [...user.pets.slice(0, petIndex), res.pet, ...user.pets.slice(petIndex + 1)]
        try {
            const updatedPet = await res.pet.save()
            const updatedUser = await res.user.save()
            res.json(updatedPet)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }


    }

    static deletePet = async (req, res) => {
        let pet
        let user
        try {
            pet = await Pet.findById(req.params.id)
            if (pet == null) {
                return res.status(404).json({ message: 'Cannot find pet' })
            }

            user = await User.findById(pet.userId)
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
        res.pet = pet
        res.user = user
        res.user.pets = user.pets.filter(animal => animal.id !== pet.id)
        try {
            await res.pet.remove()
            await res.user.save()
            res.json({ message: "Deleted pet" })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

export default petController