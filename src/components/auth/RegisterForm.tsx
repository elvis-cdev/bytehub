"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterForm() {
  const [role, setRole] = useState<"DEVELOPER" | "CLIENT">("DEVELOPER");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Join ByteHub
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5">

          <div className="space-y-2">
            <Label>Name</Label>
            <Input 
              placeholder="Enter your name"
            />
          </div>


          <div className="space-y-2">
            <Label>Email</Label>
            <Input 
              type="email"
              placeholder="you@example.com"
            />
          </div>


          <div className="space-y-2">
            <Label>Password</Label>
            <Input 
              type="password"
              placeholder="Create a password"
            />
          </div>


          <div className="space-y-3">
            <Label>I am a:</Label>

            <div className="grid grid-cols-2 gap-3">

              <Button
                type="button"
                variant={role === "DEVELOPER" ? "default" : "outline"}
                onClick={() => setRole("DEVELOPER")}
              >
                Developer
              </Button>


              <Button
                type="button"
                variant={role === "CLIENT" ? "default" : "outline"}
                onClick={() => setRole("CLIENT")}
              >
                Client
              </Button>

            </div>
          </div>


          <Button className="w-full">
            Create Account
          </Button>

        </form>
      </CardContent>
    </Card>
  );
}
