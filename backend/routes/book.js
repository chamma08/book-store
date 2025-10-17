import express from "express"
import { createBook, deleteBookById, getBookById, getBooks, updateBookById } from "../controller/bookController.js"

const router = express.Router() 

router.post("/create",createBook)
router.get("/",getBooks)
router.get("/:id",getBookById)
router.put("/:id",updateBookById)
router.delete("/:id",deleteBookById)

export default router