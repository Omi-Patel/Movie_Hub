import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import movieModel from "@/models/movie.model";
import connectDB from "@/lib/db";

// eslint-disable-next-line
export async function GET(request: NextRequest) {
  await connectDB();
  try {
    const allMovies = await movieModel.find().populate("user", "-password");

    return NextResponse.json(
      { error: "false", message: "All Movies!", allMovies },
      { status: 200 }
    );
    // eslint-disable-next-line
  } catch (error) {
    return NextResponse.json(
      { error: "true", message: "Error while fetching Movies!" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const { movieName, description, imgUrl } = await request.json();
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "true", message: "Unauthorized: Token missing" },
        { status: 401 }
      );
    }

    if (!movieName || !description) {
      return NextResponse.json(
        { error: "true", message: "All Fields Are Required!" },
        { status: 401 }
      );
    }

    // get user from token
    // You can now use the token to verify or decode the user details if needed
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "true", message: "Server error: JWT_SECRET is missing" },
        { status: 500 }
      );
    }

    const decodedUser = jwt.verify(token, secret);

    const userId = (decodedUser as jwt.JwtPayload).user;

    const newMovie = await movieModel.create({
      movieName,
      description,
      imgUrl,
      user: userId,
    });

    return NextResponse.json(
      { error: "false", message: "Movies Added Successfully!", newMovie },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "true", message: "Internal Server Error!" },
      { status: 500 }
    );
  }
}
