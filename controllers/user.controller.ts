import { Request, Response } from "express";
import User from "../models/user.model"
import Book from "../models/book.model";
import "../models/assosiations"
import Rating from "../models/rating.model";


export async function getUsers(req: Request, res: Response) {
    const users = await User.findAll()
    res.status(201).json(users).send()
}

export async function getUser(req: Request, res: Response) {
    const user = await User.findByPk(req.params.userId)
    if (!user) {
        res.status(404).json({message: "user not found"}).send()
    } else {
        res.status(201).json(user).send()
    }
}

export async function createUser(req: Request, res: Response) {
    const user = await User.create(req.body)
    res.status(201).json(user).send()
}

export async function borrowBook(req: Request, res: Response) {
    const book = await Book.findByPk(req.params.bookId)
    if (!book) {
        res.status(404).json({message: "book not found!"}).send()
    } else {
        const user = await User.findByPk(req.params.userId)
        if (!user) {
            res.status(404).json({message: "user not found!"}).send()
        } else {
            const bookUser = await book.getUser()
            if (!bookUser) {
                await book.setUser(user)
                res.status(200).json({user: user, book: book}).send()
            } else {
                res.status(404).json({message: "the requested book is already borrowed!"}).send()
            }
        }
    }
}

export async function returnBook(req: Request, res: Response) {
    const user = await User.findByPk(req.params.userId)
    const book = await Book.findByPk(req.params.bookId)

    if (!book || !user) {
        res.status(404).json({message: "book or user not found!"}).send()
    } else {
        const bookUser = await book.getUser()
        if (bookUser == null || bookUser.id != user.id) {
            res.status(400).json({message: "this book is not borrowed by this user"}).send()
        } else {
            book.setUser(null) 
            user.removeBook(book)
            var rating = null
            console.log(req.body.score)
            if (req.body.score != null) {
                const score: number = req.body.score
                rating = await Rating.create({score: score})
                await rating.setUser(user)
                await rating.setBook(book)
            }
            
            res.status(200).json({message: "book returned", book: book, user: user, rating: rating}).send()
        }
    }
}

export async function getUserInfo(req: Request, res: Response) {
    const user = await User.findByPk(req.params.userId)

    if (!user) {
        res.status(404).json({message: "user not found!"}).send()
    }else {
        const ratings = user.getRatings()
        const books = user.getBooks()

        res.status(200).json({currentBooks: books, pastRatings: ratings}).send()
    }

}