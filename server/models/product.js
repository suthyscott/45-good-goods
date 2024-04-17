import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

export const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    desc: DataTypes.STRING(2000),
    imageUrl: DataTypes.STRING(3000)
})