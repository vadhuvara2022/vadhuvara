"use client";
import AddItem from "@/components/AddItem";
import React, { useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Admin() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [show, setShow] = useState<string>("hidden");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setUploading(true);

    try {
      const response = await fetch(
        `/api/upload?filename=${file.name}&contentType=${file.type}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const { url, fields } = await response.json();

        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("file", file);

        const uploadResponse = await fetch(url, {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const imageUrl = `https://fashiongallery1.s3.us-east-1.amazonaws.com/${file.name}`;
          setMessage("Upload successful!");
          setImageUrl(imageUrl);
        } else {
          console.error("S3 Upload Error:", uploadResponse);
          setMessage("Upload failed.");
        }
      } else {
        setMessage("Failed to get pre-signed URL.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during the upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(imageUrl).then(() => {
      setMessage("URL copied to clipboard!");
      setShow("block");
    });
  };
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="bg-white h-screen sm:h-full sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Upload a File to S3
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-md gap-x-4"
            >
              <input
                id="file"
                type="file"
                className="cursor-pointer min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    setFile(files[0]);
                  }
                }}
                accept="image/png, image/jpeg, image/jpg"
              />
              <button
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                type="submit"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </form>
            <div className={`pt-2 relative ${show}`}>
              <div className="absolute left-[40%] mx-auto rounded-md bg-white/5 px-3.5 py-4 text-white">
                {message}
              </div>
            </div>
            {imageUrl && (
              <div className="mt-14 text-center text-white">
                <p>Image URL:</p>
                <p>{imageUrl}</p>
                <button
                  className="mt-2 rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={handleCopy}
                >
                  Copy URL
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <AddItem />
    </main>
  );
}