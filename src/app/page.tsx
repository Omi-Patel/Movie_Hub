import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-center p-6">
        {/* Welcome Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Welcome to Movie-Hub
        </h1>

        <p className="text-lg md:text-xl text-gray-300 text-center mb-10 max-w-3xl leading-relaxed">
          Discover, explore, and enjoy a world of movies tailored for
          enthusiasts like you. Dive into your favorite genres, actors, and
          directors – all in one place.
        </p>

        {/* Call to Action */}
        <Link
          href={"/movies"}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </>
  );
}
