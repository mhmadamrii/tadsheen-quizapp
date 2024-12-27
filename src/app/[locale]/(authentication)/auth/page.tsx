"use client";

import Link from "next/link";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { login, signup } from "../auth.action";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submitting");
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    if (activeTab === "signin") {
      login(formData);
    } else {
      signup(formData);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to QuizMaster</CardTitle>
          <CardDescription>
            Sign in or create an account to start quizzing!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Your email"
                      required
                      name="email"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Your password"
                      required
                      name="password"
                    />
                  </div>
                </div>
                <Button className="mt-4 w-full" type="submit">
                  Sign In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-name">Name</Label>
                    <Input id="signup-name" placeholder="Your name" required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      name="email"
                      id="signup-email"
                      type="email"
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      name="password"
                      id="signup-password"
                      type="password"
                      placeholder="Choose a password"
                      required
                    />
                  </div>
                </div>
                <Button className="mt-4 w-full" type="submit">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
