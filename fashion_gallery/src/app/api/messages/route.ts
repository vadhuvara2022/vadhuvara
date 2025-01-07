import {NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/mongodb';
import ContactRequest from '@/lib/models/ContactRequest';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json(); 
    await connect(); 

    const { name,mobileNumber, address, itemId } = body as { name: string; mobileNumber: string; address: string; itemId: string };

    const newContactRequest = new ContactRequest({
      name,
      mobileNumber,
      address,
      itemId,
    });

    await newContactRequest.save();

    return new NextResponse(JSON.stringify({ message: 'Request saved successfully!' }), { status: 201 });
  } catch (error: unknown) {
    console.error("Error in fetching users:", error); 
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};
