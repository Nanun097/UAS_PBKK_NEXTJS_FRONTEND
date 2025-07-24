"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

interface Customer {
  customer_id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

interface CustomerFormModalProps {
  customer?: Customer;
  onSubmit: (data: Customer) => void;
  trigger: React.ReactNode;
}

export default function CustomerFormModal({
  customer,
  onSubmit,
  trigger,
}: CustomerFormModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Customer>({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    }
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setOpen(false);
    if (!customer) {
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[hsl(27,96%,61%)]">
            {customer ? "Edit Customer" : "Tambah Customer"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[hsl(27,96%,61%)]">Nama</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-2 border-[hsl(27,96%,61%)]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[hsl(27,96%,61%)]">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-2 border-[hsl(27,96%,61%)]"
            />
          </div>
          {!customer && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[hsl(27,96%,61%)]">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="border-2 border-[hsl(27,96%,61%)]"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[hsl(27,96%,61%)]">Telepon</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border-2 border-[hsl(27,96%,61%)]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address" className="text-[hsl(27,96%,61%)]">Alamat</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border-2 border-[hsl(27,96%,61%)]"
            />
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
              {customer ? "Simpan Perubahan" : "Tambah"}
            </Button>

          </div>
        </DialogFooter>

        </form>
      </DialogContent>
    </Dialog>
  );
}
