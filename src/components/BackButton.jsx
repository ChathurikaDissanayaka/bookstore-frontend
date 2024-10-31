/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-sky-400 hover:bg-sky-300 text-white p-2 rounded-lg w-fit"
      >
        <BsArrowLeft className="text-xl" />
      </Link>
    </div>
  );
};

export default BackButton;
