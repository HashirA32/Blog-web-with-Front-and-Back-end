"use client";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { RouteSignIn, RouteSignUp } from "@/components/Helper/RouteNames";
import { getEnv } from "@/components/Helper/getenv";
import { showToast } from "@/components/Helper/showToast";
import GoogleLogin from "@/components/GoogleLogin";
zodResolver;

const SignUp = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 character long."),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 character long"),
    confirmPassword: z
      .string()
      .refine(
        (data) => data.password === data.confirmPassword,
        "Password and confirm password should be same."
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/register`,
        {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }

      navigate(RouteSignIn);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen  ">
      <Card className="p-5 w-[300px]">
        <h1 className="text-2xl font-bold text-center mb-5">
          Create new Account
        </h1>
        <div>
          <GoogleLogin />
          <div className="border mt-5 flex justify-center items-center">
            <span className="absolute font-bold">OR</span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="mb-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Email Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mb-3">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Re-enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <Button type="submit" className="w-full">
                SignUP
              </Button>
              <div className="text-sm mt-5 flex justify-center items-center gap-2">
                <p>Already have accoount</p>
                <Link
                  to={RouteSignIn}
                  className="text-orange-800 font-semibold hover:text-orange-600"
                >
                  SingIn
                </Link>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
