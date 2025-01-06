import { NextResponse } from 'next/server';
import connect from '@/lib/mongodb';
import ContactRequest from '@/lib/models/ContactRequest';

export const POST = async (request: Request) => {
  try {
    const body = await request.json(); // Parse the request body
    await connect(); // Connect to MongoDB

    const { name,mobileNumber, address, itemId } = body;

    const newContactRequest = new ContactRequest({
      name,
      mobileNumber,
      address,
      itemId,
    });

    await newContactRequest.save();

    return new NextResponse(JSON.stringify({ message: 'Request saved successfully!' }), { status: 201 });
  } catch (error: any) {
    console.error('Error saving request:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to save request.' }), { status: 500 });
  }
};