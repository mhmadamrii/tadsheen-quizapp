"use client";

import { Input } from "~/components/ui/input";
import { login, signup } from "./actions";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/supabase/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <Input
        name="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
      />
      <Input
        name="password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <Button onClick={handleLogin} type="button">
        Login
      </Button>
    </form>
  );
}
