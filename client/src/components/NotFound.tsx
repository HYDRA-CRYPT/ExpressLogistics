import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-md">
        Looks like this delivery route doesn't exist. Try going back home or
        checking our tracking page.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/"
          className="px-6 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-lg hover:bg-yellow-400 transition"
        >
          Home
        </Link>
        <Link
          to="/track"
          className="px-6 py-3 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-blue-900 transition"
        >
          Track Package
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
