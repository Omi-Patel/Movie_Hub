"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MoviesPage = () => {
  interface Movie {
    movieName: string;
    description: string;
    user: {
      name: string;
    };
  }

  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchAllMovies = async () => {
    try {
      const res = await axios(`/api/movie`);
      const data = res.data.allMovies;

      toast.success("Movie Fetched Successfully!");
      setMovies(data);
      // eslint-disable-next-line
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Landing Section */}
      <div className="relative bg-gray-800">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-yellow-500 mb-4">
            Welcome to Movie Hub
          </h1>
          <p className="text-gray-400 text-lg">
            Explore an endless collection of movies tailored just for you!
          </p>
        </div>
        <div className="absolute inset-0 bg-black opacity-25"></div>
      </div>

      {/* Movies Section */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">Top Picks</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {movies.length > 0 ? (
            movies.map((movie, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                {/* Movie Image */}
                <div className="w-full h-48 bg-gray-700"></div>

                {/* Movie Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {movie.movieName}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {movie.description}
                  </p>
                  <div className="flex justify-between items-center  mt-4">
                    <button className=" px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400 transition-colors">
                      View Details
                    </button>

                    <p className="text-gray-400 text-sm  bg-gray-900 p-2 rounded-lg flex ">
                      Author :{" "}
                      <span className="font-semibold tracking-wide">
                        {movie.user.name}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="">
              <p className="text-gray-400 text-xl mb-4">
                No movies available. Want to add a movie?
              </p>

              <Link
                href="/add-movie"
                className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-400 transition-colors"
              >
                Add Movies
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
