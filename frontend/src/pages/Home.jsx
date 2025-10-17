import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/books");
        setBooks(res.data.books);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <Link
          to="/books/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Book
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2 border border-slate-400 rounded-2xl p-2 bg-gray-100">
          <thead>
            <tr>
              <th className="text-left">No</th>
              <th className="text-left">Title</th>
              <th className="text-left">Author</th>
              <th className="text-left">Published Year</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center">
                  No books available
                </td>
              </tr>
            ) : (
              books.map((book, index) => (
                <tr key={book._id} className="border-b h-8">
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publishedYear}</td>
                  <td className="space-x-2 ">
                    <Link
                      to={`/books/show/${book._id}`}
                      className="text-white bg-blue-500 p-2 rounded-2xl hover:underline mr-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/books/edit/${book._id}`}
                      className="text-white bg-green-400 p-2 rounded-2xl hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/books/delete/${book._id}`}
                      className="text-white bg-red-500 p-2 rounded-2xl hover:underline"
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
