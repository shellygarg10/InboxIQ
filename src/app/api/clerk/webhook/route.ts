// /api/clerk/webhook/route.ts

import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();
    console.log("clerk webhook received", data);
    const email = data.email_addresses[0].email_address;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const imageUrl = data.image_url;
    const id = data.id;
    
    await db.user.create({
        data: {
            id : id,
            emailAddress : email,
            firstName : firstName,
            lastName : lastName,
            imageUrl : imageUrl,
        }
    })
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing Clerk webhook:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
