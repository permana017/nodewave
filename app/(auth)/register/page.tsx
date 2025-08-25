"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InputAuthTemplate from "@/components/partials/InputAuthTemplate";
import SelectAuthTemplate from "@/components/partials/SelectAuthTemplate";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/app/lib/axios";
import { showToast } from "@/app/lib/toast";
import { ResponseLogin } from "@/app/interfaces";

function Register() {
  const router = useRouter();
  const countryOptions = [
    { label: "Indonesia", value: "indonesia" },
    { label: "Malaysia", value: "malaysia" },
    { label: "Singapura", value: "singapura" },
  ];

  const registerSchema = z
    .object({
      email: z.string().email("Email Not Valid"),
      firstName: z.string().min(1, "First name required"),
      lastName: z.string().optional(),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
      phone: z.string().optional(),
      country: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Password confirmation not match",
    });

  const formRegister = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      phone: "",
      country: "",
    },
  });

  const {
    formState: { errors },
    register,
    watch,
    setValue,
  } = formRegister;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      // mapping body API
      const payload = {
        email: values.email,
        fullName: values.lastName
          ? `${values.firstName} ${values.lastName}`
          : values.firstName,
        password: values.password,
      };

      const res: ResponseLogin = await axiosClient.post(
        "auth/register",
        payload
      );

      if (res.success) {
        router.push("/login");
        showToast.success(res.message || "Register Success");
      } else {
        showToast.error(res.message || "Register failed");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      showToast.error(e?.response?.data?.errors || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <p className="font-bold text-5xl text-gray-600">Register</p>
      <p className=" text-gray-400 my-8">
        Lets Sign up first for enter into Square Website. Uh She Up!
      </p>
      <form onSubmit={formRegister.handleSubmit(handleSubmit)}>
        <Card className="w-full max-w-[540px] relative z-20">
          <CardContent className="p-5 grid grid-cols-2 gap-5 gap-y-6">
            <InputAuthTemplate
              field={register("firstName")}
              label="First Name"
              error={errors.firstName?.message}
              value={watch("firstName")}
            />
            <InputAuthTemplate
              field={register("lastName")}
              label="Last Name"
              value={watch("lastName")}
            />
            <InputAuthTemplate
              field={register("phone")}
              label="Phone Number"
              value={watch("phone")}
            />
            <SelectAuthTemplate
              onValueChange={(val: string) => {
                setValue("country", val);
              }}
              name="country"
              options={countryOptions}
              label="Country"
              value={watch("country")}
            />
            <div className="col-span-2">
              <InputAuthTemplate
                label="Mail Address"
                field={register("email")}
                value={watch("email")}
                type={"email"}
                error={errors.email?.message}
              />
            </div>
            <InputAuthTemplate
              label="Password"
              type="password"
              error={errors.password?.message}
              field={register("password")}
              value={watch("password")}
            />
            <InputAuthTemplate
              label="Confirm Password"
              type="password"
              field={register("confirmPassword")}
              value={watch("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <div className="col-span-2">
              <label htmlFor="description" className="text-sm">
                Tell Us About You
              </label>
              <Textarea id="description" className="mt-3" />
            </div>
            <div className="col-span-2 flex justify-between">
              <Button
                className="w-[23%] bg-slate-100 text-gray-500"
                variant={"outline"}
                type="button"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button className="w-[75%]" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default Register;
