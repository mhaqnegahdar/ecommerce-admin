"use client";

import React, { useCallback, useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

// Formik
import { Field, ErrorMessage, useFormikContext } from "formik";

// Types
import { ImageInputProps } from "@/types/props";

// Icons
import { ImagePlus, Trash } from "lucide-react";

// Components
import { Button } from "./button";

declare global {
  var cloudinary: any;
}

const ImageInput = ({ name, label, disabled }: ImageInputProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { setFieldValue, getFieldProps } = useFormikContext();

  const handleUpload = useCallback(
    (result: any) => {
      setFieldValue(name, result.info.secure_url);
    },
    [setFieldValue, name]
  );

  const handleRemove = useCallback(() => {
    setFieldValue(name, "");
  }, [setFieldValue, name]);

  if (!mounted) {
    return null;
  }
  return (
    <div>
      <label className="font-medium ">{label}</label>
      <div className="flex items-center gap-4 mb-4">
        {getFieldProps(name).value ? (
          <div className="relative h-[200px] w-[200px] rounded-md overflow-hidden mt-2">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                size={`icon`}
                onClick={handleRemove}
                variant={"destructive"}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={getFieldProps(name).value}
            />
          </div>
        ) : null}
      </div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="ecommerceadmin"
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              disabled={disabled}
              variant={"secondary"}
              onClick={() => open && open?.()}
            >
              <ImagePlus className="h-4 w-4 me-2" />
              Uploade an image
            </Button>
          );
        }}
      </CldUploadWidget>

      {/* Input */}

      <Field id={name} name={name} disabled={disabled} className="hidden" />
      <ErrorMessage
        name={name}
        className="text-rose-500 mt-2 ms-2 text-xs "
        component={"p"}
      />
    </div>
  );
};

export default ImageInput;
