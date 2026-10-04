
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const response = NextResponse.json(
      {
        message: "Logout successfully",
        success: true,
      },
      { status: 200 },
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
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
