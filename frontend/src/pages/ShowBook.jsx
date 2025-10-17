import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function ShowBook() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/books/${id}`);
        setBook(res.data.book);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="p-2">
      <BackButton className="mb-4" />
      <h1 className="text-2xl font-bold mb-4 mt-6">{book.title}</h1>
      <p className="mb-2">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="mb-2">
        <strong>Published Year:</strong> {book.publishedYear}
      </p>
      <p className="mb-2">
        <strong>Create time:</strong> {new Date(book.createdAt).toString()}
      </p>
      <p className="mb-2">
        <strong>Updated time:</strong> {new Date(book.updatedAt).toString()}
      </p>
    </div>
  );
}
