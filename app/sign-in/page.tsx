"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result: any = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        console.error(result.error);
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md border-2 border-gray-100">
        <h1 className="flex justify-center items-center font-semibold text-2xl mb-2">
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className="">
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded" // Added border
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mb-4"
          >
            Sign In
          </button>
        </form>
        <div className="text-right">
          <Link
            href="/forgot-password"
            className="ml-1 hover:underline text-blue-500"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="text-center mb-2">or</div>
        <button
          type="button"
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded mb-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            width="20"
            height="20"
          >
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
          </svg>
          Sign in with Google
        </button>
        <div className="flex justify-end items-center">
          no Account? go
          <Link href="/sign-up" className="mx-1 hover:underline text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
