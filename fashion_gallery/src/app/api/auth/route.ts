import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/mongodb';
import MyModel1 from '@/lib/models/MyModel1';


export const GET = async (req: NextRequest) => {
  await connect();

  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    if (email === 'vadhuvara2208@gmail.com' && password === 'venkat@123') {
      const user = await MyModel1.findOne({ email, password });
      if (user) {
        return NextResponse.json(user, { status: 200 });
      } else {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }
  } catch (error: unknown) {
    console.error("Error in fetching user:", error);
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error in fetching user: " + error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};

// export const GET = async (req: NextRequest) => {
//   await connect();

//   try {
//     const { searchParams } = new URL(req.url);
   
//     const email = searchParams.get('email');
//     const password = searchParams.get('password');

//     const query: Record<string, string | undefined> = {};
    
//     if (email) query.email = 'vadhuvara2208@gmail.com';
//     if (password) query.password = 'venkat@123';

//     const users = await MyModel1.find(query);

//     return NextResponse.json(users, { status: 200 });
//   } catch (error: unknown) {
//     console.error("Error in fetching users:", error);
//     if (error instanceof Error) {
//       return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
//     }
//     return NextResponse.json({ message: "Unknown error" }, { status: 500 });
//   }
// };

// export const POST = async (req: NextRequest) => {
//   await connect();

//   try {
//     const body = await req.json();
//     const { email, password } = body as { email: string; password: string };

//     if (!email || !password) {
//       console.error("Missing required fields");
//       return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//     }

//     const newUser = new MyModel1({  email, password });
//     await newUser.save();

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error: unknown) {
//     console.error("Error in fetching users:", error); 
//     if (error instanceof Error) {
//       return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
//     }
//     return NextResponse.json({ message: "Unknown error" }, { status: 500 });
//   }
// };



