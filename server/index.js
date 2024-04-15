import express from 'express'
import cors  from 'cors'
import { configDotenv } from "dotenv";

import authFuncs from './controllers/authCtrl.js'

configDotenv()
const {PORT} = process.env

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/register', authFuncs.register)
app.post('/api/login', authFuncs.login)

app.get('/api/products')
app.post('/api/products')
app.put('/api/products')
app.delete('/api/products')

app.listen(PORT, console.log(`Take us to warp 4545!`))