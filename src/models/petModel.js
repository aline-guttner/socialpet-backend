import mongoose from "mongoose"

const petSchema = new mongoose.Schema({
    petName: String,
    petType: String,
    petImg: String,
    userId: String
})

const Pet = mongoose.model('Pet', petSchema)

export default Pet