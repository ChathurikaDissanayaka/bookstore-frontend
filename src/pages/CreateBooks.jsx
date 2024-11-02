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
      <h1 className="text-3xl my-4">Add New Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-800">Title:</label>
          <input
            type="text"
            value={title}
            placeholder="To Kill a Mockingbird"
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-800">Author:</label>
          <input
            type="text"
            value={author}
            placeholder="Harper Lee"
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-800">Published Year:</label>
          <input
            type="number"
            value={publishedYear}
            min="1000"
            max={new Date().getFullYear()}
            placeholder="1960"
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 border-sky-400 px-4 py-2 w-full text-gray-700 rounded-lg"
          />
        </div>
        <button
          className="py-2 w-full bg-sky-400 hover:bg-sky-300 my-8 rounded-lg text-white"
          onClick={handleSaveBook}
        >
          Save Details
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
