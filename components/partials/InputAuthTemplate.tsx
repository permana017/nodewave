"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

export interface PropsInputTemplate {
  field: UseFormRegisterReturn;
  label?: string;
  placeholder?: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}

function InputAuthTemplate({
  field,
  label,
  placeholder,
  type = "text",
  error,
  value,
}: PropsInputTemplate) {
  return (
    <div>
      <div className="group relative">
        <label
          htmlFor={field?.name || label}
          className={`origin-start text-muted-foreground/70 absolute block cursor-text px-1 text-sm transition-all
                  ${
                    value
                      ? "pointer-events-none top-0 -translate-y-1/2 text-xs font-medium text-foreground"
                      : "top-1/2 -translate-y-1/2 group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium"
                  }
                `}
        >
          <span className="bg-background inline-flex px-2">{label}</span>
        </label>
        {type == "password" ? (
          <InputPassword
            placeholder={placeholder}
            value={value}
            field={field}
          />
        ) : (
          <Input
            type={type}
            id={field?.name || label}
            placeholder={placeholder}
            value={value}
            {...field}
          />
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default InputAuthTemplate;

const InputPassword = ({ field, value, label }: PropsInputTemplate) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Input
        {...field}
        type={show ? "text" : "password"}
        className={" pr-10"}
        id={field?.name || label}
        value={value}
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-blue-500 focus:outline-none"
        onClick={() => setShow((v) => !v)}
      >
        {!show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </>
  );
};
