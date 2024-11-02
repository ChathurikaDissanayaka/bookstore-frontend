import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${backendUrl}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book has been deleted.", {
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
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-full sm:w-[90%] md:w-[400px] lg:w-[600px] p-8 mx-auto my-16">
        <h3 className="text-2xl">Do you really want to delete this book?</h3>
        <button
          className="p-4 bg-red-500 hover:bg-red-400 text-white m-8 w-full rounded-lg"
          onClick={handleDeleteBook}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
