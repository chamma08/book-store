import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/books/${id}`);
      if (res.status === 200) {
        alert("Book deleted successfully!");
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-2">
      <h1 className="text-2xl font-bold mb-4 mt-6">
        Are you sure you want to delete this book?
      </h1>
      <p className="mb-4">This action cannot be undone.</p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDelete}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Book"}
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded ml-2 mt-4"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </div>
  );
}
