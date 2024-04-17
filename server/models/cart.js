import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

export const Cart = sequelize.define("cart", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})