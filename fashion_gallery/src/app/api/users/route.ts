import connect from "@/lib/mongodb";
import MyModel from "@/lib/models/MyModel"; 
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId;



export const GET = async (request: Request) => {
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

export const POST = async (request: Request) => {
  try {
    const body = await request.json(); 
    await connect(); 

    
    const { name, gender, category, cost, description, sizes, image, totalImages } = body;
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

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json(); 
    const { itemId, category, cost, description, image } = body;

    await connect(); 

    
    if (!itemId) {
      return new NextResponse(
        JSON.stringify({ message: "Item ID is missing" }),
        { status: 400 }
      );
    }

    
    if (!Types.ObjectId.isValid(itemId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Item ID" }), {
        status: 400,
      });
    }

   
    const updateData: {
      category?: string;
      cost?: number;
      description?: string;
      image?: string;
    } = {};
    if (category) updateData.category = category;
    if (cost) updateData.cost = cost;
    if (description) updateData.description = description;
    if (image) updateData.image = image;


    const updatedItem = await MyModel.findOneAndUpdate(
      { _id: new ObjectId(itemId) }, 
      updateData, 
      { new: true } 
    );

   
    if (!updatedItem) {
      return new NextResponse(
        JSON.stringify({ message: "Item not found in the database" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Item updated successfully", item: updatedItem }),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error in fetching users:", error); 
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
}
export const DELETE = async (request: Request) => {
    try {
      const { searchParams } = new URL(request.url);
      const itemId = searchParams.get("itemId"); 
      if (!itemId) {
        return new NextResponse(JSON.stringify({ message: "Item ID is missing" }), {
          status: 400,
        });
      }
  
      
      if (!Types.ObjectId.isValid(itemId)) {
        return new NextResponse(JSON.stringify({ message: "Invalid Item ID" }), {
          status: 400,
        });
      }
  
      await connect(); 
  const deletedItem = await MyModel.findByIdAndDelete(new ObjectId(itemId));
  
     
      if (!deletedItem) {
        return new NextResponse(
          JSON.stringify({ message: "Item not found in the database" }),
          { status: 404 }
        );
      }
  
      return new NextResponse(
        JSON.stringify({ message: "Item deleted successfully", item: deletedItem }),
        { status: 200 }
      );
    } catch (error: unknown) {
      console.error("Error in fetching users:", error); 
    if (error instanceof Error) {
      return NextResponse.json({ message: "Error in fetching users: " + error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Unknown error" }, { status: 500 });
  }
  };