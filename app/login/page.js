"use client";
import Navbar from "@/components/Navbar";
import { useSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const { data, status } = useSession();

  return (
    <div className={`flex flex-col min-h-screen relative`}>
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-6">Login to IdeaHub</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
          Connect with innovators, share your ideas, and collaborate on exciting
          projects. Turn visions into reality.
        </p>
        <Button
          variant="secondary"
          className="w-full max-w-md py-6 gap-3 text-lg"
          onClick={() => signIn("google")}
        >
          <Image src="/google.svg" width={20} height={20} alt="Google" />
          Sign in with Google
        </Button>
      </main>
    </div>
  );
}
