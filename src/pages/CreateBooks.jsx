import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    if (!title || !author || !publishedYear) {
      enqueueSnackbar("All fields are required.", { variant: "warning" });
      return;
    } else if (publishedYear.length != 4) {
      enqueueSnackbar("Year should be 4 characters in length.", {
        variant: "warning",
      });
      return;
    }

    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios
      .post(`${backendUrl}/books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book has been created successfully.", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error occured.", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
     
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-sky-400 rounded-xl w-full sm:w-[90%] md:w-[400px] lg:w-[600px] p-4 mx-auto">
        <div className="my-2">
          <label className="text-xl mr-4 text-gray-800">Title:</label>
          <input
            type="text"
            value={title}
            placeholder="To Kill a Mockingbird"
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg my-2"
          />
        </div>
        <div className="my-2">
          <label className="text-xl mr-4 text-gray-800">Author:</label>
          <input
            type="text"
            value={author}
            placeholder="Harper Lee"
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg my-2"
          />
        </div>
        <div className="my-2">
          <label className="text-xl mr-4 text-gray-800">Published Year:</label>
          <input
            type="number"
            value={publishedYear}
            min="1000"
            max={new Date().getFullYear()}
            placeholder="1960"
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg my-2"
          />
        </div>
        <button
          className="border-2 border-sky-400 hover:border-sky-300 py-2 w-full bg-sky-400 hover:bg-sky-300 my-4 rounded-lg text-white"
          onClick={handleSaveBook}
        >
          Save Details
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
