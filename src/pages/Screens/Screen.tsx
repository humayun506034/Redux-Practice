import { useState } from "react";
import { useGetAllScreenQuery } from "../../redux/features/Screen/screenApi";
import Pagination from "../../components/Pagination";
import { FaSearch } from "react-icons/fa"; // Make sure to install react-icons: npm i react-icons
import { Link } from "react-router-dom";

const Screen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // <-- search state
  console.log("🚀 ~ Screen ~ searchTerm:", searchTerm);

  const { data, isLoading, error } = useGetAllScreenQuery({
    page: currentPage.toString(),
    searchTerm: searchTerm,
  });

  if (isLoading)
    return <p className="text-center text-lg">Loading screens...</p>;
  if (error)
    return <p className="text-center text-red-500">Something went wrong!</p>;

  const screens = data?.data?.data || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages - 1 || 1;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Available Screens
      </h2>

      <div className="max-w-md mx-auto mb-8 relative">
        <input
          type="text"
          placeholder="Search screens..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm
               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
               transition duration-300 ease-in-out"
          aria-label="Search screens"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-10">
        {screens.map((screen: any) => (
          <div
            key={screen.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={screen.img_url}
              alt={screen.screen_name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {screen.screen_name}
              </h3>
              <p className="text-gray-600 text-sm mb-1">
                📍 <strong>Location:</strong> {screen.location}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                🖥️ <strong>Resolution:</strong> {screen.resolution}
              </p>
              <p className="text-gray-600 text-sm mb-1">
                📏 <strong>Size:</strong> {screen.screen_size}
              </p>
              <p className="text-gray-800 font-medium mt-2">
                💰 Price:{" "}
                <span className="text-green-600 font-bold">
                  ৳{screen.price}
                </span>
              </p>
              <Link to={`/screen/${screen.slug}`}>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium mt-5 w-full">
                  Show Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Screen;
