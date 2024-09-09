import { Express } from "express"
import { check } from "express-validator"
import * as userController from "../controllers/user.controller"
import * as bookController from  "../controllers/book.controller"


const routerConfig = function (app: Express) {
    app.get('/users', [
        userController.getUsers
    ])
    app.get('/users/:userId', [
        check('userId').isNumeric(),
        userController.getUser
    ])
    app.post('/users', [
        check('name').isLength({min: 2, max: 150}).trim().escape(),
        userController.createUser
    ])
    app.get('/users/info/:userId', [
        check('userId').isNumeric(),
        userController.getUserInfo
    ])
    app.get('/books', [
        bookController.getBooks
    ])
    app.get('/books/:bookId', [
        bookController.getBook
    ])
    app.post('/books', [
        check('name').isLength({min: 2, max: 150}).trim().escape(),
        bookController.createBook
    ])
    app.post('/users/:userId/borrow/:bookId', [
        check('userId').isNumeric().trim().escape(),
        check('bookId').isNumeric().trim().escape(),
        userController.borrowBook
    ])
    app.post('/users/:userId/return/:bookId', [
        check('userId').isNumeric().trim().escape(),
        check('bookId').isNumeric().trim().escape(),
        check('score').isInt({min: 1, max: 10}),
        userController.returnBook
    ])

}

export default routerConfig