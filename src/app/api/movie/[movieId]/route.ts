import connectDB from "@/lib/db";
import movieModel from "@/models/movie.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  await connectDB();
  const url = request.nextUrl;

  // Extract the `movieId` from the path
  const movieId = url.pathname.split("/").pop(); // Assuming the `id` is the last segment

  try {
    const { movieName, description, imgUrl } = await request.json();

    const updatedMovie = await movieModel.findByIdAndUpdate(
      movieId,
      { movieName, description, imgUrl },
      { new: true }
    );

    return NextResponse.json(
      { error: "false", message: "Movie Updated Successfully!", updatedMovie },
      { status: 200 }
    );
    // eslint-disable-next-line
  } catch (error) {
    return NextResponse.json(
      { error: "true", message: "Error While updating the movie!" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  await connectDB();
  const url = request.nextUrl;

  // Extract the `movieId` from the path
  const movieId = url.pathname.split("/").pop(); // Assuming the `id` is the last segment

  try {
    const deletedMovie = await movieModel.findByIdAndDelete(movieId);

    return NextResponse.json(
      { error: "false", message: "Movie Deleted Successfully!", deletedMovie },
      { status: 200 }
    );
    // eslint-disable-next-line
  } catch (error) {
    return NextResponse.json(
      { error: "true", message: "Error While deleting the movie!" },
      { status: 500 }
    );
  }
}
