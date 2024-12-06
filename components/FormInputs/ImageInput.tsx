import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

type FileRouterEndpoints =
  | "categoryImage"
  | "studentProfileImage"
  | "parentProfileImage"
  | "schoolLogo"
  | "fileUploads"
  | "mailAttachments";

type ImageInputProps = {
  title: string;
  imageUrl: string;
  setImageUrl: (url: string) => void;
  endpoint: FileRouterEndpoints; // Restrict to valid endpoints
  className?: string;
  size?: "sm" | "lg";
};

export default function ImageInput({
  title,
  imageUrl,
  setImageUrl,
  endpoint,
  className,
  size = "lg",
}: ImageInputProps) {
  const [uploading, setUploading] = useState(false);

  const handleUploadComplete = (res: any[]) => {
    setUploading(false);
    if (res && res.length > 0) {
      setImageUrl(res[0].url); // Set the uploaded image URL
    }
  };

  const handleUploadError = (error: Error) => {
    setUploading(false);
    console.error(`Upload error: ${error.message}`);
  };
  if (size === "sm") {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Image
              alt={title}
              className={`h-20 w-60 mx-auto rounded-md object-cover ${className}`}
              height={500}
              src={imageUrl}
              width={500}
            />
            <UploadButton
              className="col-span-full"
              endpoint={endpoint} // Use the typed endpoint here
              onClientUploadComplete={(res) => {
                handleUploadComplete(res);
              }}
              onUploadError={(error) => {
                handleUploadError(error);
              }}
            />
            {uploading && (
              <p className="text-center text-gray-500">Uploading...</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt={title}
            className={`h-40 w-full rounded-md object-cover ${className}`}
            height={500}
            src={imageUrl}
            width={500}
          />
          <UploadButton
            className="col-span-full"
            endpoint={endpoint} // Use the typed endpoint here
            onClientUploadComplete={(res) => {
              handleUploadComplete(res);
            }}
            onUploadError={(error) => {
              handleUploadError(error);
            }}
          />
          {uploading && (
            <p className="text-center text-gray-500">Uploading...</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
