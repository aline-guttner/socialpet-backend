import User from "../models/userModel.js"
import Pet from "../models/petModel.js"

class userController{
    static getAllUsers = async (req, res) => {
        try {
            const users = await User.find()
            res.json(users)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    static getOneUser = async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' })

            }
            res.send(user)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
    

    static updateUser = async (req, res) => {
        let user
        try {
            user = await User.findById(req.params.id)
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' })

            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
        res.user = user
        if (req.body.name != null) {
            res.user.name = req.body.name
        }
        if (req.body.username != null) {
            res.user.username = req.body.username
        }
        if (req.body.email != null) {
            res.user.email = req.body.email
        }
        if (req.body.birthDate != null) {
            res.user.birthDate = req.body.birthDate
        }
        if (req.body.phone != null) {
            res.user.phone = req.body.phone
        }
        if (req.body.profileImg != null) {
            res.user.profileImg = req.body.profileImg
        }
        if (req.body.backImg != null) {
            res.user.backImg = req.body.backImg
        }
        if (req.body.pets != null) {
            res.user.pets = req.body.pets
        }
        try {
            const updatedUser = await res.user.save()
            res.json(updatedUser)
        } catch (err) {
            console.log(user)
            res.status(400).json({ message: err.message })
        }
    }
    static deleteUser = async (req, res) => {
        let user
        try {
            user = await User.findById(req.params.id)
            if (user == null) {
                return res.status(404).json({ message: 'Cannot find user' })

            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
        res.user = user
        try {
            await res.user.remove()
            res.json({ message: "Deleted user" })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}

export default userController