"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api"; // Pastikan semua fungsi ini ada

import CategoryFormModal from "./CategoryFormModal"; // Modal untuk tambah/edit kategori

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface Category {
  category_id?: number;
  product_id: string;
  name: string;
  description?: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data));
  }, []);

  const handleCreate = async (data: Category) => {
    const token = localStorage.getItem("token");
    try {
      await createCategory(data, token);
      const updated = await fetchCategories();
      setCategories(updated);
      toast.success("Kategori berhasil ditambahkan");
    } catch {
      toast.error("Gagal menambahkan kategori");
    }
  };

  const handleUpdate = async (data: Category) => {
    const token = localStorage.getItem("token");
    if (!data.category_id) return;
    try {
      await updateCategory(data.category_id, data, token);
      const updated = await fetchCategories();
      setCategories(updated);
      toast.success("Kategori berhasil diperbarui");
    } catch {
      toast.error("Gagal memperbarui kategori");
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await deleteCategory(id, token);
      setCategories((prev) => prev.filter((item) => item.category_id !== id));
      toast.success("Kategori berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus kategori");
    }
  };


  return (
  <div className="rounded-md border p-4 space-y-4 bg-white"> {/* Bisa juga kasih bg-white di parent */}
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Daftar Kategori</h2>
      <CategoryFormModal
        onSubmit={handleCreate}
        trigger={<Button>+ Tambah</Button>}
      />
    </div>

    <Table className="bg-white rounded-md shadow-sm">
      <TableHeader>
        <TableRow className="bg-white">
          <TableHead className="bg-white">#</TableHead>
          <TableHead className="bg-white">Product ID</TableHead>
          <TableHead className="bg-white">Nama</TableHead>
          <TableHead className="bg-white">Deskripsi</TableHead>
          <TableHead className="bg-white text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category, index) => (
          <TableRow
            key={category.category_id}
            className="bg-white hover:bg-gray-50"
          >
            <TableCell className="bg-white">{index + 1}</TableCell>
            <TableCell className="bg-white">{category.product_id}</TableCell>
            <TableCell className="bg-white">{category.name}</TableCell>
            <TableCell className="bg-white">{category.description}</TableCell>
            <TableCell className="bg-white text-right space-x-2">
              <CategoryFormModal
                category={category}
                onSubmit={handleUpdate}
                trigger={
                  <Button size="sm" variant="outline" className="bg-blue-400">
                    Edit
                  </Button>
                }
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Hapus
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Yakin ingin menghapus kategori ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak bisa dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(category.category_id!)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Ya, Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

}
