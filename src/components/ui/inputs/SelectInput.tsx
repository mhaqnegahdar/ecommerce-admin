"use client";

// Hooks / Packages
import React, { useEffect } from "react";
import { Field, ErrorMessage, FieldProps } from "formik";

// Components
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export interface SelectInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  data: { value: string; label: string }[];
}

const SelectInput = React.forwardRef<HTMLInputElement, SelectInputProps>(
  ({ className, name, label, data, disabled, ...props }, ref) => {
    return (
      <div>
        {label ? <label className="font-medium ">{label}</label> : null}
        <Field
          type="select"
          name={name}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 mt-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          disabled={disabled}
          ref={ref}
          {...props}
        >
          {({ field, form, meta }: FieldProps) => {
            const { setFieldValue } = form;
            console.log(form);
            return (
              <>
                <Select
                  {...field}
                  onValueChange={value => setFieldValue(field.name, value)}
                  defaultValue={props.defaultValue?.toString()}
                >
                  <SelectTrigger>
                    <SelectValue defaultValue={props.defaultValue} />
                  </SelectTrigger>
                  <SelectContent>
                    {data.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
SelectInput.displayName = "SelectInput";

export { SelectInput };
