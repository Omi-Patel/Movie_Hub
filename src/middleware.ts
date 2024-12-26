import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Import jwtVerify from jose

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value; // Retrieve the token from cookies

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Encode the secret as a Uint8Array

    // Verify the token using jose's jwtVerify function
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);

    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/add-movie"], // Protect all routes under /profile and /add-movie
};
