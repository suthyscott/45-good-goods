import { configDotenv } from "dotenv";
configDotenv()
const {CONNECTION_STRING} = process.env
import Sequelize from 'sequelize'

const sequelize = new Sequelize(CONNECTION_STRING, {dialect: 'postgres'})

export default sequelize