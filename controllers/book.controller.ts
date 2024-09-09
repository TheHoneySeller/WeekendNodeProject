import {Request, Response} from "express"
import Book from "../models/book.model"

export async function getBooks(req: Request, res: Response) {
    const books = await Book.findAll()
    res.status(201).json(books).send()
}

export async function getBook(req: Request, res: Response) {
    const book = await Book.findByPk(req.params.bookId)
    if (!book) {
        res.status(404).json({message: "book not found!"}).send()
    } else {
        res.status(201).json(book).send()
    }
}

export async function createBook(req: Request, res: Response) {
    const book = await Book.create(req.body)
    res.status(201).json(book).send()
}