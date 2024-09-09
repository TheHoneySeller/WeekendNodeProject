import { Model, DataTypes, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, IntegerDataType } from "sequelize"
import sequelize from "../persist/sequelize"
import User from "./user.model";

class Book extends Model {
    declare id: number
    declare name: string
    declare userId: number|null

    public getUser!: BelongsToGetAssociationMixin<User|null>
    public setUser!: BelongsToSetAssociationMixin<User|null, IntegerDataType>
}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    { sequelize }
)

export default Book