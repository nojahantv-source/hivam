
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginForm() {

  const router = useRouter();

  const supabase = createClient();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin() {

    setLoading(true);

    setError("");

    const { error } =
      await supabase.auth.signInWithPassword({

        email,

        password,

      });

    setLoading(false);

    if (error) {

      setError("ایمیل یا رمز عبور اشتباه است.");

      return;

    }

    router.push("/admin");

    router.refresh();

  }

  return (

    <Card className="w-full max-w-md rounded-[32px] shadow-2xl">

      <CardContent className="p-10">

        <h1 className="mb-8 text-center text-3xl font-extrabold">

          ورود مدیر

        </h1>

        <div className="space-y-6">

          <div>

            <Label>

              ایمیل

            </Label>

            <Input

              className="mt-2"

              value={email}

              onChange={(e)=>setEmail(e.target.value)}

              placeholder="admin@hivam.ir"

            />

          </div>

          <div>

            <Label>

              رمز عبور

            </Label>

            <Input

              type="password"

              className="mt-2"

              value={password}

              onChange={(e)=>setPassword(e.target.value)}

            />

          </div>

          {error && (

            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">

              {error}

            </div>

          )}

          <Button

            onClick={handleLogin}

            disabled={loading}

            className="h-12 w-full"

          >

            {loading

              ? "در حال ورود..."

              : "ورود"}

          </Button>

        </div>

      </CardContent>

    </Card>

  );

}

