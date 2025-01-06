import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/mongodb';
import MyModel1 from '@/lib/models/MyModel1';

export const GET = async (req: NextRequest) => {
  await connect();

  try {
    const { searchParams } = new URL(req.url);
   
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    const query: any = {};
    
    if (email) query.email = email;
    if (password) query.password = password;

    const users = await MyModel1.find(query); // Fetch users based on query

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error("Error in fetching users:", error); // Log the error
    return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  await connect();

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      console.error("Missing required fields");
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newUser = new MyModel1({  email, password });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("Error in creating user:", error); // Log the error
    return NextResponse.json({ message: "Error in creating user: " + error.message }, { status: 500 });
  }
};

const handler = async (req: NextRequest) => {
  if (req.method === 'GET') {
    return GET(req);
  } else if (req.method === 'POST') {
    return POST(req);
  } else {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
};

export default handler;