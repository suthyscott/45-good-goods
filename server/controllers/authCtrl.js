import bcrypt from 'bcryptjs'
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";
configDotenv()
const {SECRET} = process.env

let createToken = (username, id) => {
    const token = jwt.sign({username, id}, SECRET, {expiresIn: '2 days'})
    return token
}

export default {
    register: async (req, res) => {
        try {
            const {username, password} = req.body

            let foundUser = await User.findOne({
                where: {username: username}
            })

            // User.findOne({
            //     where: {username: username}
            // }).then(foundUser => {
            //     console.log(foundUser)
            // })

            if(foundUser){
                res.status(400).send('That username is already taken.')
            } else {
                const salt = bcrypt.genSaltSync(5)
                const hash = bcrypt.hashSync(password, salt)

                const newUser = await User.create({
                    username: username, 
                    hashedPass: hash
                })

                const token = createToken(newUser.username, newUser.id)

                const exp = Date.now() + 1000 * 60 * 60 * 48

                res.status(200).send({
                    username: newUser.username,
                    userId: newUser.id,
                    token,
                    exp
                })
            }

        } catch (err) {
            console.log('Error in register function', err)
            res.sendStatus(500)
        }
    }, 
    login: async (req, res) => {
        try {
            const { username, password } = req.body
            let foundUser = await User.findOne({
                where: { username: username.trim() }
            })

            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(
                    password,
                    foundUser.hashedPass
                )

                if (isAuthenticated) {
                    const token = createToken(foundUser.username, foundUser.id)

                    const exp = Date.now() + 1000 * 60 * 60 * 48

                    res.status(200).send({
                        username: foundUser.username,
                        userId: foundUser.id,
                        token,
                        exp
                    })
                } else {
                    res.status(400).send('That password is incorrect')
                }
            } else {
                res.status(400).send("No user with that username exists.")
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}