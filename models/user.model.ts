import { Model, DataTypes, HasManyAddAssociationMixin, IntegerDataType, HasManyRemoveAssociationMixin, HasManyGetAssociationsMixin } from "sequelize"
import sequelize from "../persist/sequelize"
import Book from "./book.model";
import Rating from "./rating.model";

class User extends Model {
    declare id: number;
    declare name: string;

    public addBook!: HasManyAddAssociationMixin<Book, IntegerDataType>
    public removeBook!: HasManyRemoveAssociationMixin<Book, IntegerDataType>
    public getBooks!: HasManyGetAssociationsMixin<Book>
    public getRatings!: HasManyGetAssociationsMixin<Rating>
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { sequelize }
)



export default User