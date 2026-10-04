import { NextRequest, NextResponse } from "next/server";
import { User } from "../../models/UserModel";
import { Connection } from "../../db/db";
import  jwt from "jsonwebtoken";

export const GET =async (req:NextRequest)=>{
  try {
    await Connection()

   const token = req.cookies.get("token")?.value;

   if (!token) {
     return NextResponse.json(
       { message: "Unauthorized", success: false },
       { status: 401 },
     );
   }

  const Id = jwt.verify(token, process.env.JWT_SECRET!);
  if (typeof Id === "string" || typeof Id.id !== "string") {
    return NextResponse.json(
      { message: "Unauthorized", success: false },
      { status: 401 },
    );
  }

  const user = await User.findById(Id.id).select('-password');
if(!user){
  return NextResponse.json(
      {
        message: "user not exist",
        success: false,
      },
      { status: 500 },
    );
}
return NextResponse.json(
      {
        message: "Authorized success",
        success: true,
        user:user,
      },
      { status: 200 },
    );

  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
}