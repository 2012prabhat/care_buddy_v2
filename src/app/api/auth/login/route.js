import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check email verification
    if (!user.verified) {
      return Response.json(
        { message: "Please verify your email before logging in" },
        { status: 403 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Set refresh token in cookie
    cookies().set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: parseInt(process.env.COOKIE_EXPIRES) * 24 * 60 * 60, // days → seconds
      path: "/", // important in Next.js
    });

    return Response.json(
      {
        message: "Login successful",
        accessToken,
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
