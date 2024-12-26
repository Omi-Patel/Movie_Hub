import connectDB from "@/lib/db";
import userModel from "@/models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  connectDB();
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "true", message: "All fields are required!" },
        { status: 400 }
      );
    }

    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "true", message: "Invalid Credentials!" },
        { status: 400 }
      );
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return NextResponse.json(
        { error: "true", message: "Invalid Credentials!" },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      { error: "false", message: "Login Successfull!" },
      { status: 201 }
    );

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = await jwt.sign(
      { user: existingUser._id },
      process.env.JWT_SECRET
    );

    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.log("Error while signin", error);
    return NextResponse.json(
      { error: "true", message: "Login Failed!" },
      { status: 500 }
    );
  }
}
