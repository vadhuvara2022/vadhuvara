import connect from "@/lib/mongodb";
import MyModel from "@/lib/models/MyModel"; // Import your MyModel
import { NextResponse } from "next/server";
import { Types } from "mongoose";

const ObjectId = Types.ObjectId;



export const GET = async (request: Request) => {
  try {
    await connect(); // Connect to MongoDB

    const url = new URL(request.url);
    const gender = url.searchParams.get("gender");

    

    let items;
    if (gender) {
      items = await MyModel.find({ gender }); // Fetch items based on gender
    } else {
      items = await MyModel.find(); // Fetch all items if no gender is specified
    }

   

    return new NextResponse(JSON.stringify(items), { status: 200 });
  } catch (error: any) {
    console.error("Error in fetching items:", error); // Log the error
    return new NextResponse("Error in fetching items: " + error.message, {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json(); // Parse the request body
    await connect(); // Connect to MongoDB

    // Validate required fields
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
  } catch (error: any) {
    console.error('Error in creating item:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
// PATCH: Update an item
export const PATCH = async (request: Request) => {
  try {
    const body = await request.json(); // Parse the request body
    const { itemId, category, cost, description, image } = body; // Extract fields

    await connect(); // Connect to MongoDB

    // Validate itemId
    if (!itemId) {
      return new NextResponse(
        JSON.stringify({ message: "Item ID is missing" }),
        { status: 400 }
      );
    }

    // Validate if itemId is a valid ObjectId
    if (!Types.ObjectId.isValid(itemId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid Item ID" }), {
        status: 400,
      });
    }

    // Prepare update object
    const updateData: any = {};
    if (category) updateData.category = category;
    if (cost) updateData.cost = cost;
    if (description) updateData.description = description;
    if (image) updateData.image = image;

    // Update the item
    const updatedItem = await MyModel.findOneAndUpdate(
      { _id: new ObjectId(itemId) }, // Find item by ID
      updateData, // Update fields
      { new: true } // Return the updated document
    );

    // Check if the item was found and updated
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
  } catch (error: any) {
    return new NextResponse("Error in updating item: " + error.message, {
      status: 500,
    });
  }
};

// DELETE: Delete an item
export const DELETE = async (request: Request) => {
    try {
      const { searchParams } = new URL(request.url); // Parse the request URL
      const itemId = searchParams.get("itemId"); // Extract itemId from query params
  
      // Validate itemId
      if (!itemId) {
        return new NextResponse(JSON.stringify({ message: "Item ID is missing" }), {
          status: 400,
        });
      }
  
      // Validate if itemId is a valid ObjectId
      if (!Types.ObjectId.isValid(itemId)) {
        return new NextResponse(JSON.stringify({ message: "Invalid Item ID" }), {
          status: 400,
        });
      }
  
      await connect(); // Connect to MongoDB
  
      // Delete the item by ID
      const deletedItem = await MyModel.findByIdAndDelete(new ObjectId(itemId));
  
      // Check if the item was found and deleted
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
    } catch (error: any) {
      return new NextResponse("Error in deleting item: " + error.message, {
        status: 500,
      });
    }
  };