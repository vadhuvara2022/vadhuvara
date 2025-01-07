import connect from "@/lib/mongodb";
import MyModel from "@/lib/models/MyModel"; 
import {NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connect(); 

    const url = new URL(request.url);
    const gender = url.searchParams.get("gender");
    let items;
    if (gender) {
      items = await MyModel.find({ gender }); 
    } else {
      items = await MyModel.find(); 
    }

   

    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (error: unknown) {
    console.error("Error in fetching users:", error); 
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json(); 
    await connect(); 

    
    const { name, gender, category, cost, description, sizes, image, totalImages } = body as {
      name: string;
      gender: string;
      category: string;
      cost: number;
      description: string;
      sizes: string[];
      image: string;
      totalImages: { src: string }[];
    };
    if (!name || !gender || !category || !cost || !description || !sizes || !image || !totalImages) {
      return new NextResponse(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const newItem = new MyModel({
      name,
      gender,
      category,
      cost,
      description,
      sizes,
      image,
      totalImages: totalImages.map((img: { src: string}) => ({
        src: img.src,
        
      })),
    });

    await newItem.save();

    return new NextResponse(JSON.stringify(newItem), { status: 201 });
  } catch (error: unknown) {
    console.error("Error in fetching users:", error); 
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
};

