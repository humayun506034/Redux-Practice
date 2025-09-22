import { useParams } from "react-router-dom";
import { useGetSingleScreenQuery } from "../../redux/features/Screen/screenApi";

const ScreenDetails = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetSingleScreenQuery(slug as string);

  const screenData = data?.data;

  if (isLoading) {
    return <p className="text-center text-lg py-10">Loading screen details...</p>;
  }

  if (error || !screenData) {
    return <p className="text-center text-red-500 py-10">Failed to load screen details.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={screenData.img_url}
          alt={screenData.screen_name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {screenData.screen_name}
          </h2>
          <p className="text-gray-600 mb-4">{screenData.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <strong>📍 Location:</strong> {screenData.location}
            </p>
            <p>
              <strong>🖥️ Resolution:</strong> {screenData.resolution}
            </p>
            <p>
              <strong>📏 Size:</strong> {screenData.screen_size}
            </p>
            <p>
              <strong>💰 Price:</strong>{" "}
              <span className="text-green-600 font-semibold">
                ৳{screenData.price}
              </span>
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  screenData.status === "active"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {screenData.status}
              </span>
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              <span className="capitalize">{screenData.availability}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenDetails;
