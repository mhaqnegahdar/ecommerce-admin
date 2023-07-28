"use client";

// Hooks / Packages
import React, { useEffect } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";

// Components
import { Checkbox } from "@/components/ui/checkbox";

import { cn } from "@/lib/utils";

export interface CheckBoxInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  description?: string;
}

const CheckBoxInput = React.forwardRef<HTMLInputElement, CheckBoxInputProps>(
  ({ className, name, label, description, disabled, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex w-full h-full rounded-md border border-input bg-background px-3 py-2 mt-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <Field
          type="checkbox"
          name={name}
          disabled={disabled}
          ref={ref}
          {...props}
        >
          {({ field, form, meta }: FieldProps) => {
            const { setFieldValue } = form;
            return (
              <>
                <div className="items-top flex space-x-2">
                  <Checkbox
                    id={name}
                    {...field}
                    checked={field.value}
                    onCheckedChange={() => {
                      setFieldValue(name, !field.value);
                    }}
                  />

                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={name}
                      className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {label}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </>
            );
          }}
        </Field>
        <ErrorMessage
          name={name}
          component={"p"}
          className="text-rose-500 mt-2 ms-2 text-xs "
        />
      </div>
    );
  }
);
CheckBoxInput.displayName = "CheckBoxInput";

export { CheckBoxInput };
