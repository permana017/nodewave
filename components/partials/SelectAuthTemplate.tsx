import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Options = {
  label: string;
  value: any;
};

export interface PropsInputTemplate {
  label?: string;
  placeholder?: string;
  type?: string;
  options: Options[];
  value: any;
  name: string;
  onValueChange: (val: string) => void;
}

function SelectAuthTemplate({
  label,
  placeholder = " ",
  options,
  value,
  name,
  onValueChange,
}: PropsInputTemplate) {
  return (
    <div className="group relative">
      <label
        htmlFor={name}
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
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, key) => (
            <SelectItem value={option?.value} key={key}>
              {option?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectAuthTemplate;
