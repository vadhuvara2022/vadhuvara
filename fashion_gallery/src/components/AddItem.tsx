"use client";
import React, { useState } from "react";

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    category: "",
    cost: 0,
    description: "",
    sizes: "",
    image: "",
    totalImages: [{ src: "" }],
  });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTotalImagesChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedTotalImages = [...formData.totalImages];
    updatedTotalImages[index] = { ...updatedTotalImages[index], [name]: value };
    setFormData((prevData) => ({
      ...prevData,
      totalImages: updatedTotalImages,
    }));
  };

  const addImageField = () => {
    setFormData((prevData) => ({
      ...prevData,
      totalImages: [...prevData.totalImages, { src: ""}],
    }));
  };

  const removeImageField = (index: number) => {
    const updatedTotalImages = formData.totalImages.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      totalImages: updatedTotalImages,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
    const sizesArray = formData.sizes.split(',').map((size) => size.trim());
    const updatedFormData = { ...formData, sizes: sizesArray };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        
        alert("Item added successfully!");
        setFormData({
          name: '',
          gender: '',
          category: '',
          cost: 0,
          description: '',
          sizes: '',
          image: '',
          totalImages: [{ src: "" }],
        });
        
      } else {
        const errorData = await response.json();
        setMessage(`Failed to add item: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while adding the item.");
    }
  };

  return (
    <main>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cost</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sizes (comma separated)</label>
            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Images</label>
            {formData.totalImages.map((image, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  name="src"
                  placeholder="Image Source"
                  value={image.src}
                  onChange={(e) => handleTotalImagesChange(index, e)}
                  className="w-full px-3 py-2 border rounded mb-2"
                  required
                />
                
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            >
              Add Image
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Add Item
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </main>
  );
}