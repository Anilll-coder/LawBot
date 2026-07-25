import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export async function POST(req) {
  const session = await getServerSession();
  
  if (!session || session.user?.email !== "lawchatbot17@gmail.com") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
  }

  const client = await clientPromise();
  const db = client.db();

  const result = await db.collection("lawyers").updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: "approved" } }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ success: false, message: "Lawyer not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, result });
}
