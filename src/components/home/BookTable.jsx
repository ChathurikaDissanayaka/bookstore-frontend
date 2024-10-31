/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BookTable = ({books}) => {
  return (
    <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border-2 border-sky-400 text-sky-400 rounded-md p-1">No</th>
              <th className="border-2 border-sky-400 text-sky-400 rounded-md p-1">Title</th>
              <th className="border-2 border-sky-400 text-sky-400 rounded-md p-1 max-md:hidden">
                Author
              </th>
              <th className="border-2 border-sky-400 text-sky-400 rounded-md p-1 max-md:hidden">
                Published Year
              </th>
              <th className="border-2 border-sky-400 text-sky-400 rounded-md p-1">Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border-2 border-sky-400 text-gray-800 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border-2 border-sky-400 text-gray-800 rounded-md text-center">
                  {book.title}
                </td>
                <td className="border-2 border-sky-400 text-gray-800 rounded-md text-center max-md:hidden">
                  {book.author}
                </td>
                <td className="border-2 border-sky-400 text-gray-800 rounded-md text-center max-md:hidden">
                  {book.publishedYear}
                </td>
                <td className="border-2 border-sky-400 text-gray-800 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-600 hover:text-green-300" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-yellow-300" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600 hover:text-red-300" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  )
}

export default BookTable