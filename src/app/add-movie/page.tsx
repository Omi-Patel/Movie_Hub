"use client";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const AddMovie = () => {
  const [movieName, setMovieName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddMovie = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/movie", {
        movieName,
        description,
        imageUrl,
      });
      const data = res.data;
      toast.success(data.message);
      window.location.href = "/profile";
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors or network issues
        toast.error("Unexpected Error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-4xl font-semibold text-center text-yellow-400 mb-6">
          Add New Movie
        </h1>

        <form className="space-y-6">
          {/* Movie Name */}
          <div>
            <label
              htmlFor="movieName"
              className="block text-lg font-medium text-gray-300"
            >
              Movie Name
            </label>
            <input
              type="text"
              id="movieName"
              name="movieName"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              className="mt-2 px-4 py-3 w-full bg-gray-700 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter movie name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2 px-4 py-3 w-full bg-gray-700 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter movie description"
              required
              style={{ resize: "none" }}
            />
          </div>

          {/* Image URL (Optional) */}
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-lg font-medium text-gray-300"
            >
              Image URL (Optional)
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-2 px-4 py-3 w-full bg-gray-700 text-gray-300 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter image URL"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={(e) => handleAddMovie(e)}
              type="submit"
              className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg text-xl font-semibold hover:bg-yellow-400 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
