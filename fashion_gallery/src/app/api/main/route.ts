
import { NextRequest,NextResponse } from "next/server";
import connect from "@/lib/mongodb"; 
import MyModel from "@/lib/models/MyModel"; 

export const GET = async (request: NextRequest) => {
  try {
    await connect(); 

    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const name = url.searchParams.get("name");
    const id = url.searchParams.get("id");

   

    const query: Record<string, string | undefined> = {};
    if (category) query.category = category;
    if (name) query.name = name;
    if (id) query._id = id;

    const items = await MyModel.find(query); 

    

    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (error: unknown) {
    console.error("Error in fetching users:", error); 
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};


const handler = async (request:NextRequest) => {
  if (request.method === 'GET') {
    return GET(request);
  } else {
    return new NextResponse(JSON.stringify({ message: 'Method not allowed' }), { status: 405 });
  }
};

export default handler;