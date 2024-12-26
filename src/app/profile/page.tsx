"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserLandingPage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [movies, setMovies] = useState<
    { _id: string; movieName: string; description: string }[]
  >([]);

  const fetchUser = async () => {
    try {
      const res = await axios(`/api/user/profile`);
      const data = res.data;
      setUser(data.user);
      setMovies(data.ownMovies);
      toast.success("User Fetched Successfully!");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async (movieId: string) => {
    try {
      const res = await axios.delete(`/api/movie/${movieId}`);

      const data = res.data;
      toast.success(data.message);
      fetchUser();
      // eslint-disable-next-line
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors or network issues
        toast.error("Unexpected Error:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Example user data

  // Example list of movies added by the user

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* User Info Section */}
      <div className="bg-gray-800 py-12">
        <div className="container mx-auto px-6 text-center">
          {/* Profile Image */}
          <div className="w-32 h-32 mx-auto mb-4 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-yellow-500">
            <div className="w-full h-48 bg-gray-700"></div>
          </div>
          {/* User Details */}
          <h1 className="text-4xl font-bold text-yellow-500">{user?.name}</h1>
          <p className="text-xl text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Movies Section */}
      <div className="container mx-auto px-6 py-10">
        <div className="flex p-3 mb-6 justify-between items-center">
          <h2 className="text-3xl  font-bold text-yellow-500 ">
            Movies Added by You
          </h2>

          <Link
            href={"/add-movie"}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Movie!
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Movie Image */}
              <div className="w-full h-48 bg-gray-700"></div>
              {/* Movie Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-yellow-500">
                  {movie.movieName}
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  {movie.description}
                </p>
                <div className="flex justify-between items-center">
                  <button className="mt-3 px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400">
                    View Details
                  </button>
                  <div>
                    <button className="mt-3 ml-2 px-2  text-green-500  font-semibold rounded hover:text-green-400">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(movie._id)}
                      className="mt-3 ml-2 px-2 text-red-500  font-semibold rounded hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;
