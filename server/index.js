import express from 'express'
import cors  from 'cors'
import { configDotenv } from "dotenv";

import authFuncs from './controllers/authCtrl.js'
import sequelize from './util/database.js';
import { User } from './models/user.js';
import { Product } from './models/product.js';
import { Cart } from './models/cart.js';

configDotenv()
const PORT = process.env.PORT || 4545

const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/register', authFuncs.register)
app.post('/api/login', authFuncs.login)

app.get('/api/products')
app.post('/api/products')
app.put('/api/products')
app.delete('/api/products')

sequelize.sync({force: true})
    .then(() => {
        app.listen(PORT, console.log(`Take us to warp 4545!`))
    })