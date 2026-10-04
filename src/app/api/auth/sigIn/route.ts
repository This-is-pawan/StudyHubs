
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { Connection } from "../../db/db";
import { sign_in } from "../../validation/uservalidation";
import { User } from "../../models/UserModel";

export const POST = async (req: NextRequest) => {
  try {
    await Connection();

    const body = await req.json();

    const validated = sign_in.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          message: validated.error.flatten(),
          success: false,
        },
        {
          status: 400,
        },
      );
    }

    const { email, password } = validated.data;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "User does not exist",
          success: false,
        },
        {
          status: 404,
        },
      );
    }

    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Invalid password",
          success: false,
        },
        {
          status: 401,
        },
      );
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5d",
      },
    );

    const response = NextResponse.json(
      {
        message: "Login successfully",
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 200,
      },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      {
        status: 500,
      },
    );
  }
};
