
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import { Connection } from "../../db/db";
import { sign_up } from "../../validation/uservalidation";
import { User } from "../../models/UserModel";

export const POST = async (req: NextRequest) => {
  try {
    await Connection();

    const body = await req.json();

    const validated = sign_up.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: validated.error.flatten(),
          success: false,
        },
        { status: 400 },
      );
    }

    const { name, email, password } = validated.data;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return NextResponse.json(
        {
          message: "Email already exists!",
          success: false,
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: newUser._id.toString(),
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5d",
      },
    );

    const response = NextResponse.json(
      {
        message: "Registered successfully",
        success: true,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 },
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
   

    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
};
