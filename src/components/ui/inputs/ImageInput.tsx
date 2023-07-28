"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

// Formik
import { Field, ErrorMessage, useFormikContext } from "formik";

// Types
import { ImageInputProps } from "@/types/props";

// Icons
import { ImagePlus, Trash } from "lucide-react";

// Components
import { Button } from "../button";

declare global {
  var cloudinary: any;
}

const ImageInput = ({
  name,
  label,
  disabled,
  multiChoice = false,
}: ImageInputProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { setFieldValue, getFieldProps } = useFormikContext();

  console.log('image val',getFieldProps(name).value);

  const handleUpload = useCallback(
    (result: any) => {
      if (multiChoice) {
        const values = getFieldProps(name).value;
        setFieldValue(name, [...values, { url: result.info.secure_url }]);
      } else {
        setFieldValue(name, result.info.secure_url);
      }
    },
    [setFieldValue, name, multiChoice, getFieldProps]
  );

  const handleRemove = useCallback(
    (url?: string) => {
      if (multiChoice && url) {
        const values = getFieldProps(name).value;
        setFieldValue(name, [
          ...values.filter((current: { url: string }) => current.url !== url),
        ]);
      } else {
        setFieldValue(name, "");
      }
    },
    [setFieldValue, name, multiChoice, getFieldProps]
  );

  // Upload Options
  const options = useMemo(() => {
    if (multiChoice) {
      return {};
    } else {
      return { maxFiles: 1 };
    }
  }, [multiChoice]);

  if (!mounted) {
    return null;
  }
  return (
    <div className="col-span-full">
      <label className="font-medium ">{label}</label>
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {/* Single Image Show */}
        {multiChoice === false && getFieldProps(name).value ? (
          <div className="relative h-[200px] w-[200px] rounded-md overflow-hidden mt-2">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                size={`icon`}
                onClick={() => handleRemove()}
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
        {/* Multi Image Show */}
        {multiChoice === true && getFieldProps(name).value.length > 0 ? (
          <>
            {getFieldProps(name).value.map((image: { url: string }) => (
              <div
                key={image.url}
                className="relative h-[200px] w-[200px] rounded-md overflow-hidden mt-2"
              >
                <div className="z-10 absolute top-2 right-2">
                  <Button
                    type="button"
                    size={`icon`}
                    onClick={() => handleRemove(image.url)}
                    variant={"destructive"}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={image.url}
                />
              </div>
            ))}
          </>
        ) : null}
      </div>
      <CldUploadWidget
        onUpload={handleUpload}
        uploadPreset="ecommerceadmin"
        options={options}
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
