"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import InputAuthTemplate from "@/components/partials/InputAuthTemplate";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { axiosClient } from "@/app/lib/axios";
import { ResponseLogin } from "@/app/interfaces";
import { showToast } from "@/app/lib/toast";
import { useUserStore } from "@/lib/store";
import { useRouter } from "next/navigation";

function Login() {
  const registerSchema = z.object({
    email: z.email("Email Not Valid"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const formRegister = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
    register,
    watch,
  } = formRegister;

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    setLoading(true);
    try {
      const res: ResponseLogin = await axiosClient.post("auth/login", values);
      showToast.success(res.message);
      useUserStore.getInitialState().setUser(res.content.user);
      router.push("/todo");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      showToast.error(e?.response?.data?.message || "Failed Login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <p className="font-bold text-5xl text-gray-600">Sign In</p>
      <p className=" text-gray-400 my-8">
        Just Sign in if you han an account in here. Enjoy your website
      </p>
      <form
        onSubmit={formRegister.handleSubmit(handleSubmit)}
        className="w-full max-w-[480px] relative z-20"
      >
        <Card className="mb-5">
          <CardContent className="p-5 flex flex-col gap-5 gap-y-7">
            <InputAuthTemplate
              label="Mail Address"
              field={register("email")}
              value={watch("email")}
              type={"email"}
              error={errors.email?.message}
            />
            <InputAuthTemplate
              label="Password"
              type="password"
              error={errors.password?.message}
              field={register("password")}
              value={watch("password")}
            />
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <Input type="checkbox" className="w-4 h-4" />
                <label className="mb-0 text-sm text-gray-600">
                  Remember Me
                </label>
              </div>
              <div>
                <p className="cursor-pointer text-sm text-blue-400">
                  Forgot Password
                </p>
              </div>
            </div>
            <div className="col-span-2 flex justify-between">
              <Button className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Link href={"/register"}>
          <p className="cursor-pointer text-sm text-blue-600 font-medium text-center">
            Don&apos;t have an account? Register
          </p>
        </Link>
      </form>
    </div>
  );
}

export default Login;
