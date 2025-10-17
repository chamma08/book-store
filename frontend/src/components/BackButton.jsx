import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function BackButton({ destination = "/" }) {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-700 w-fit"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
}
