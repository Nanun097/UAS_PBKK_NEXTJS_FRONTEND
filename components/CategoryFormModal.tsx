"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";

interface Product {
  product_id: string;
  name: string;
}

interface Category {
  category_id?: number;
  product_id: string;
  name: string;
  description?: string;
}

interface Props {
  category?: Category;
  onSubmit: (data: Category) => void;
  trigger: React.ReactNode;
}

export default function CategoryFormModal({ category, onSubmit, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Category>(
    category ?? { name: "", product_id: "", description: "" }
  );
  const [products, setProducts] = useState<Product[]>([]);

  const accentColor = "hsl(27, 96%, 61%)";

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchProducts(token)
      .then((data) => setProducts(data))
      .catch(() => alert("Gagal memuat produk"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (value: string) => {
    setForm((prev) => ({ ...prev, product_id: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.product_id.trim()) {
      alert("Nama dan Produk wajib diisi.");
      return;
    }
    onSubmit(form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle
            className="text-center font-semibold text-xl"
            style={{ color: accentColor }}
          >
            {category ? "Edit Kategori" : "Tambah Kategori"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label
              htmlFor="product_id"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Pilih Produk
            </Label>
            <Select
              value={form.product_id}
              onValueChange={handleProductChange}
            >
              <SelectTrigger
                id="product_id"
                className="border"
                style={{ borderColor: accentColor }}
              >
                <SelectValue placeholder="Pilih produk" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.product_id} value={product.product_id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="name"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Nama Kategori
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama kategori"
              style={{ borderColor: accentColor }}
              className="focus:ring-2"
            />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Deskripsi (Opsional)
            </Label>
            <Input
              type="text"
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Deskripsi kategori"
              style={{ borderColor: accentColor }}
              className="focus:ring-2"
            />
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
              {category ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
