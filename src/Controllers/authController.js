// import express, { response } from 'express'
// const router = express.Router();
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"

class AuthController {

    static userRegister = async (request, response) => {
        console.log("pegou")
        const { email } = request.body;
        const possibleUser = await User.findOne({ email })
        if (possibleUser) {
            response.status(400).send({ error: "Usuário já cadastrado" })
            return
        }

        const user = await User.create(request.body)

        return response.status(200).send({ user })
    }




    static login = async (req, res) => {
        console.log("pegou-login")
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return res.status(400).send({ error: "Usuário não encontrado" })

        const isTheSame = await bcrypt.compare(password, user.password)
        if (!isTheSame) {
            return res.status(400).send({ error: "Credenciais Incorretas!" })
        }
        // gerando token

        user.password = undefined
        return res.send(
            {
                user,
                token: this.generateToken(user)
            }
        )
    }


    static generateToken(user) {
        return jsonwebtoken.sign({ id: user.id, name: user.name }, process.env.API_SECRET, {
            expiresIn: 86400
        })

    }

    static userHome = (req, res) => {
        console.log('REQUISIÇÃO', req);
        res.status(200).send({
            "message": "Olá, pessoa!"
        });
    };
}



export default AuthController;