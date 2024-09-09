import User from "./user.model"
import Book from "./book.model"
import Rating from "./rating.model"


User.hasMany(Book)
Book.belongsTo(User, {
    foreignKey: {
        allowNull: true
    }
})

User.hasMany(Rating)
Rating.belongsTo(User)

Book.hasMany(Rating)
Rating.belongsTo(Book)