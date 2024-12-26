import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "@/models/user.model";
import connectDB from "@/lib/db";

export async function POST(request: NextRequest) {
  connectDB();
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "true", message: "All fields are required!" },
        { status: 400 }
      );
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "true", message: "User already exist with this email!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const response = NextResponse.json(
      { error: "false", message: "Registration Successfull!" },
      { status: 201 }
    );

    const token = await jwt.sign({ user: newUser._id }, process.env.JWT_SECRET);
    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.log("Error while register", error);
    return NextResponse.json(
      { error: "true", message: "Registration failed!" },
      { status: 500 }
    );
  }
}
