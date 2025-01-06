
import { NextResponse } from "next/server";
import connect from "@/lib/mongodb"; // Ensure this path is correct
import MyModel from "@/lib/models/MyModel"; // Ensure this path is correct

export const GET = async (request: Request) => {
  try {
    await connect(); // Connect to MongoDB

    const url = new URL(request.url);
    const category = url.searchParams.get("category");
    const name = url.searchParams.get("name");
    const id = url.searchParams.get("id");

   

    const query: any = {};
    if (category) query.category = category;
    if (name) query.name = name;
    if (id) query._id = id;

    const items = await MyModel.find(query); // Fetch items based on query

    

    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (error: any) {
    console.error("Error in fetching items:", error); // Log the error
    return new NextResponse("Error in fetching items: " + error.message, {
      status: 500,
    });
  }
};