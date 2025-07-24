"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  username: string;
}

interface Props {
  user?: User;
  trigger: React.ReactNode;
  onSubmit: (data: User) => void;
}

export default function UserFormModal({ user, trigger, onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<User>({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    username: user?.username || "",
    id: user?.id || "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    setOpen(false);
  };

  const inputStyle =
    "border border-[hsl(32.1_97.7%_83.1%)] focus:border-[hsl(32.1_97.7%_83.1%)] text-[hsl(27_96%_61%)] placeholder-[hsl(27_96%_61%)]";
  const labelStyle = "text-[hsl(27_96%_61%)]";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[hsl(27_96%_61%)] text-center">
            {user ? "Edit User" : "Tambah User"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label htmlFor="name" className={labelStyle}>Nama</Label>
            <Input
              id="name"
              name="name"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username" className={labelStyle}>Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className={labelStyle}>Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password" className={labelStyle}>Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className={`pr-10 ${inputStyle}`}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-center">
            <Button
              onClick={handleSubmit}
              className="
                bg-[hsl(30,17%,2%)] 
                text-white 
                hover:bg-[hsl(27,96%,50%)] 
                px-6
              "
            >
              {user ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
