// import { Link, useParams } from "react-router-dom";
// import { useGetSingleScreenQuery } from "../../redux/features/Screen/screenApi";

// const ScreenDetails = () => {
//   const { slug } = useParams();
//   const { data, isLoading, error } = useGetSingleScreenQuery(slug as string);

//   const screenData = data?.data;

//   if (isLoading) {
//     return (
//       <p className="text-center text-lg py-10">Loading screen details...</p>
//     );
//   }

//   if (error || !screenData) {
//     return (
//       <p className="text-center text-red-500 py-10">
//         Failed to load screen details.
//       </p>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
//         <img
//           src={screenData.img_url}
//           alt={screenData.screen_name}
//           className="w-full h-64 object-cover"
//         />
//         <div className="p-6">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             {screenData.screen_name}
//           </h2>
//           <p className="text-gray-600 mb-4">{screenData.description}</p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
//             <p>
//               <strong>📍 Location:</strong> {screenData.location}
//             </p>
//             <p>
//               <strong>🖥️ Resolution:</strong> {screenData.resolution}
//             </p>
//             <p>
//               <strong>📏 Size:</strong> {screenData.screen_size}
//             </p>
//             <p>
//               <strong>💰 Price:</strong>{" "}
//               <span className="text-green-600 font-semibold">
//                 ৳{screenData.price}
//               </span>
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={`font-semibold ${
//                   screenData.status === "active"
//                     ? "text-green-600"
//                     : "text-red-500"
//                 }`}
//               >
//                 {screenData.status}
//               </span>
//             </p>
//             <p>
//               <strong>Availability:</strong>{" "}
//               <span className="capitalize">{screenData.availability}</span>
//             </p>
//           </div>
//         </div>
//         <div className="py-4 flex items-center justify-center">
//           <Link to="/">
//             {" "}
//             <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md mt-4">
//               Back To Home
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScreenDetails;



import { Link, useParams } from "react-router-dom";
import { useGetSingleScreenQuery } from "../../redux/features/Screen/screenApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react"; // Optional icon for clarity

const ScreenDetails = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetSingleScreenQuery(slug as string);

  const screenData = data?.data;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <Skeleton className="w-full h-64 mb-6 rounded-lg" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !screenData) {
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load screen details.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-muted py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <div>
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2 text-sm">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Card */}
        <Card className="overflow-hidden">
          <img
            src={screenData.img_url}
            alt={screenData.screen_name}
            className="w-full h-64 object-cover"
          />

          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800">
              {screenData.screen_name}
            </CardTitle>
            <p className="text-gray-600">{screenData.description}</p>
          </CardHeader>

          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ScreenDetails;
