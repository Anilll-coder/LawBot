import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const { email, availability } = await req.json();

    if (!email || !availability) {
      return NextResponse.json(
        { message: "Email and availability are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise();
    const db = client.db();
    const lawyersCollection = db.collection("lawyers");

    const result = await lawyersCollection.updateOne(
      { email },
      { $set: { availability } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Lawyer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Availability updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating availability:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
