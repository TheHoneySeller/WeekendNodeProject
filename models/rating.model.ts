import { Model, DataTypes, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, IntegerDataType } from "sequelize"
import sequelize from "../persist/sequelize"
import Book from "./book.model"
import User from "./user.model"

class Rating extends Model {
    declare id: number
    declare userId: number
    declare bookId: number
    declare score: number

    public setUser!: BelongsToSetAssociationMixin<User, IntegerDataType>
    public setBook!: BelongsToSetAssociationMixin<Book, IntegerDataType>
}

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        score: {
            type: DataTypes.INTEGER,
        }
    }, {sequelize}
)

export default Rating