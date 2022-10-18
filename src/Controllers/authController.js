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


    static verifyJWT = async (req, res) => {
        let token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).send({ auth: false, message: 'Token não informado.' });
        }
        try {
            let payload = await jsonwebtoken.verify(token, process.env.API_SECRET, function (err, decoded) {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token inválido.' });
                req.userId = decoded.id;

            });
        } catch (error) {
            if (e instanceof jwt.JsonWebTokenError) {
                return res.status(401).end()
            }
            return res.status(400).end()
        }

    }
}




export default AuthController;