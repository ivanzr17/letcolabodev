"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@radix-ui/themes";

const ImageUpload = ({
  icon,
  name,
  defaultValue = "",
}: {
  icon: IconDefinition;
  name: string;
  defaultValue?: string;
}) => {
  const [resource, setResource] = useState<any>(null);
  const [url, setUrl] = useState(defaultValue);

  useEffect(() => {
    if (defaultValue) {
      setResource({ secure_url: defaultValue });
    }
  }, [defaultValue]);

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleUploadSuccess = (result: any) => {
    setResource(result.info);
    setUrl(result.info.secure_url);
  };

  return (
    <>
      <div>
        <div className="bg-gray-200 size-24 inline-flex items-center content-center justify-center rounded-md">
          {resource ? (
            <img
              src={resource.secure_url}
              alt="Uploaded Image"
              className="rounded-md w-full h-full object-fill"
            />
          ) : (
            <FontAwesomeIcon icon={icon} className="text-gray-400 size-6" />
          )}
        </div>
        <div className="mt-2">
          <input type="hidden" name={name} value={url} />
          <CldUploadWidget
            onSuccess={handleUploadSuccess}
            uploadPreset="juniordev"
          >
            {({ open }) => {
              return (
                <Button
                  onClick={(event) => {
                    handleClick(event);
                    open();
                  }}
                >
                  Select file
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
