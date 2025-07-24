"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Github, Chrome } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(username, password);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        toast.success("Login berhasil!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        toast.error("Login gagal: token tidak diterima");
      }
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Terjadi kesalahan saat login.";
      toast.error("Login gagal", {
        description: msg,
      });
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-gray-100 px-4",
        className
      )}
      {...props}
    >
      <Card
        className="w-full max-w-lg shadow-lg border border-gray-200"
        style={{ backgroundColor: "hsla(55.3, 80%, 91.8%, 0.5)" }}

      >
        <CardHeader className="text-center space-y-1 text-black">
          <CardTitle className="text-2xl font-bold">
            Hai, Selamat Datang Kembali!
          </CardTitle>
          <CardDescription className="text-gray-700">
            Masukkan username dan password Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-black">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-black">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full transition duration-200 ease-in-out bg-black text-white hover:bg-gray-800"
            >
              Login
            </Button>

            {/* Login alternatif */}
            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[hsl(34.3,100%,91.8%)] px-2 text-gray-800">
                  atau login dengan
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 justify-center bg-white"
              >
                <Chrome size={18} className="text-red-500" />
                Login dengan Google
              </Button>
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 justify-center bg-white"
              >
                <Github size={18} />
                Login dengan GitHub
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center text-sm text-black">
            Belum punya akun?{" "}
            <a
              href="#"
              className="text-blue-800 hover:underline font-medium"
            >
              Daftar sekarang
            </a>
          </div>
        </CardContent>
        <div className="pb-6 text-center text-xs text-gray-700">
          Dengan melanjutkan, Anda menyetujui{" "}
          <a href="#" className="underline hover:text-gray-900">
            Ketentuan Layanan
          </a>{" "}
          dan{" "}
          <a href="#" className="underline hover:text-gray-900">
            Kebijakan Privasi
          </a>
          .
        </div>
      </Card>
    </div>
  );
}
