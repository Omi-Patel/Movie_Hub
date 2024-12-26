import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import userModel from "@/models/user.model";
import connectDB from "@/lib/db";
import movieModel from "@/models/movie.model";

export async function GET(request: NextRequest) {
  connectDB();

  const token = request.cookies.get("token")?.value;

  try {
    if (!token) {
      return NextResponse.json(
        { error: "true", message: "Unauthorized: Token missing" },
        { status: 401 }
      );
    }

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
    const user = await userModel.findOne({ _id: userId });

    // fetching all the movies added by the user in profile
    const ownMovies = await movieModel.find({ user: userId });

    return NextResponse.json({
      error: "false",
      message: "Profile data retrieved successfully.",
      user,
      ownMovies,
    });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "true", message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}
