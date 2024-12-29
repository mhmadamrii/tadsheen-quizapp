"use client";

import Link from "next/link";

import { useState } from "react";
import { Spinner } from "~/components/spinner";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import { login, signup } from "../auth.action";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useQueryState } from "nuqs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function AuthPage() {
  const [email, setEmail] = useQueryState("email");
  const [password, setPassword] = useQueryState("password");
  const [activeTab, setActiveTab] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      if (activeTab === "signin") {
        login(formData).then((res) => {
          if (res.status === 401) {
            toast.error(res.message);
          } else {
            toast.success("Successfully logged in");
          }
        });
      } else {
        signup(formData).then((res) => {
          if (res.status === 409) {
            toast.error(res.message);
          } else {
            toast.success("Successfully registered");
          }
        });
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-card">
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
                      disabled={isLoading}
                      id="signin-email"
                      type="email"
                      placeholder="Your email"
                      required
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      disabled={isLoading}
                      id="signin-password"
                      type="password"
                      placeholder="Your password"
                      required
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="mt-4 w-full" type="submit">
                  {isLoading ? <Spinner /> : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      disabled={isLoading}
                      name="email"
                      id="signup-email"
                      type="email"
                      placeholder="Your email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      disabled={isLoading}
                      name="password"
                      id="signup-password"
                      type="password"
                      placeholder="Choose a password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button className="mt-4 w-full" type="submit">
                  {isLoading ? <Spinner /> : "Sign Up"}
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
