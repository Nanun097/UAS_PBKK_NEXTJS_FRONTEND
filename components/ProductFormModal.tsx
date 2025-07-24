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
import { useEffect, useState } from "react";

interface Product {
  product_id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
}

interface ProductFormModalProps {
  product?: Product;
  onSubmit: (data: Product) => void;
  trigger: React.ReactNode;
}

export default function ProductFormModal({
  product,
  onSubmit,
  trigger,
}: ProductFormModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category_id: "",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price" || name === "stock") {
      // Kalau input kosong, set ke 0 di state, agar tetap number
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setOpen(false);
    if (!product) {
      setFormData({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category_id: "",
      });
    }
  };

  const accentColor = "hsl(27, 96%, 61%)";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-[hsl(27,96%,61%)]">
            {product ? "Edit Produk" : "Tambah Produk"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <Label htmlFor="name" className="font-medium" style={{ color: accentColor }}>
            Nama Produk
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ borderColor: accentColor }}
            className="focus:ring-2"
            placeholder="Masukkan nama produk"
          />
        </div>

        <div className="grid gap-4 py-2">
          <Label htmlFor="description" className="font-medium" style={{ color: accentColor }}>
            Deskripsi Produk
          </Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ borderColor: accentColor }}
            className="focus:ring-2"
            placeholder="Masukkan deskripsi singkat"
          />
        </div>

        <div className="grid gap-4 py-2">
          <Label htmlFor="price" className="font-medium" style={{ color: accentColor }}>
            Harga (Rp)
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={formData.price === 0 ? "" : formData.price}
            onChange={handleChange}
            style={{ borderColor: accentColor }}
            className="focus:ring-2"
            placeholder="Masukkan harga produk"
          />
        </div>

        <div className="grid gap-4 py-2">
          <Label htmlFor="stock" className="font-medium" style={{ color: accentColor }}>
            Stok Tersedia
          </Label>
          <Input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock === 0 ? "" : formData.stock}
            onChange={handleChange}
            style={{ borderColor: accentColor }}
            className="focus:ring-2"
            placeholder="Masukkan jumlah stok"
          />
        </div>

        <div className="grid gap-4 py-2">
          <Label htmlFor="category_id" className="font-medium" style={{ color: accentColor }}>
            ID Kategori
          </Label>
          <Input
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            style={{ borderColor: accentColor }}
            className="focus:ring-2"
            placeholder="Masukkan ID kategori produk"
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
              {product ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
