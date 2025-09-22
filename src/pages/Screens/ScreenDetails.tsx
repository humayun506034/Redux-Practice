import { Link, useParams } from "react-router-dom";
import { useGetSingleScreenQuery } from "../../redux/features/Screen/screenApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react"; 
import Spinner from "../../components/Spinner";

const ScreenDetails = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useGetSingleScreenQuery(slug as string);

  const screenData = data?.data;

  if (isLoading) {
    return <Spinner/>
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
