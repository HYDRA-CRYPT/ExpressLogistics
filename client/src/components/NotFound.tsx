import { Link } from "react-router-dom";
import { Truck, PackageSearch, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 p-4">
      <div className="flex flex-col items-center gap-4 bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-xl px-8 py-12">
        <div className="flex items-center gap-3">
          <Truck className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          <span className="text-5xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">
            404
          </span>
          <PackageSearch className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2 text-center">
          Oops! This Route Wasn't Found
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-6 text-center max-w-lg">
          The page or delivery route you’re looking for doesn’t exist.
          <br />
          Try going back home or track a package below.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/track"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-yellow-500 text-yellow-600 dark:text-yellow-400 rounded-lg font-semibold hover:bg-yellow-500 hover:text-white transition"
          >
            <PackageSearch className="w-5 h-5" />
            Track Package
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
