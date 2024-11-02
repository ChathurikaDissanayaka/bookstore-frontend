import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${backendUrl}/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [backendUrl, id]);

  return (
    <div className="p-4">
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full sm:w-[90%] md:w-[600px] lg:w-[800px] p-4 sm:p-6 md:p-8 mx-auto my-8 md:my-16">
          <div className="my-2 md:my-4">
            <span className="text-lg md:text-xl mr-2 md:mr-4 text-gray-800">
              Id:
            </span>
            <span className="text-lg md:text-xl text-gray-800">{book._id}</span>
          </div>
          <div className="my-2 md:my-4">
            <span className="text-lg md:text-xl mr-2 md:mr-4 text-gray-800">
              Title:
            </span>
            <span className="text-lg md:text-xl text-gray-800">
              {book.title}
            </span>
          </div>
          <div className="my-2 md:my-4">
            <span className="text-lg md:text-xl mr-2 md:mr-4 text-gray-800">
              Author:
            </span>
            <span className="text-lg md:text-xl text-gray-800">
              {book.author}
            </span>
          </div>
          <div className="my-2 md:my-4">
            <span className="text-lg md:text-xl mr-2 md:mr-4 text-gray-800">
              Published Year:
            </span>
            <span className="text-lg md:text-xl text-gray-800">
              {book.publishedYear}
            </span>
          </div>
          <div className="my-2 md:my-4">
            <span className="text-lg md:text-xl mr-2 md:mr-4 text-gray-800">
              Created Time:
            </span>
            <span className="text-lg md:text-xl text-gray-800">
              {new Date(book.createdAt).toString()}
            </span>
          </div>
          <div className="my-2 md:my-4">
            <span className="text-lg md:text-xl mr-2 md:mr-4 text-gray-800">
              Last Updated Time:
            </span>
            <span className="text-lg md:text-xl text-gray-800">
              {new Date(book.updatedAt).toString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
