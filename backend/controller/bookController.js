import Book from "../model/Book.js";

export const createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear)
      return res.status(400).json({ message: "All fields required to fill" });
    const existedBook = await Book.findOne({ title });
    if (existedBook)
      return res.status(400).json({ message: "Book already added" });
    const newBook = new Book({
      title,
      author,
      publishedYear,
    });
    await newBook.save();
    res.status(201).json({
      message: "Book added successfully",
      book: {
        ...newBook.toObject(),
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Books fetched successfully",
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({
      message: "Book fetched successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishedYear } = req.body;
    if (!title || !author || !publishedYear)
      return res.status(400).json({ message: "All fields required to fill" });
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;
    await book.save();
    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
