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
import {
  fetchProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} from "@/lib/api";
import { toast } from "sonner";
import ProductFormModal from "./ProductFormModal";
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

interface Product {
  product_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log("Product Data:", data);
      setProducts(data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await deleteProduct(id, token);
      setProducts((prev) => prev.filter((p) => p.product_id !== id));
      toast.success("Produk berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus produk");
    }
  };

  const handleCreate = async (data: Product) => {
    const token = localStorage.getItem("token");
    try {
      await createProduct(data, token);
      const updated = await fetchProducts();
      setProducts(updated);
      toast.success("Produk berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan produk");
    }
  };

  const handleUpdate = async (data: Product) => {
    const token = localStorage.getItem("token");
    try {
      await updateProduct(data.product_id, data, token);
      const updated = await fetchProducts();
      setProducts(updated);
      toast.success("Produk berhasil diperbarui");
    } catch (err) {
      toast.error("Gagal memperbarui produk");
    }
  };

return (
  <div className="rounded-md border p-4 space-y-4 bg-white">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Daftar Produk</h2>
      <ProductFormModal
        onSubmit={handleCreate}
        trigger={<Button>+ Tambah Produk</Button>}
      />
    </div>
    <Table className="bg-white rounded-md shadow-sm">
      <TableHeader>
        <TableRow className="bg-white">
          <TableHead className="bg-white">#</TableHead>
          <TableHead className="bg-white">Nama</TableHead>
          <TableHead className="bg-white">Deskripsi</TableHead>
          <TableHead className="bg-white">Harga</TableHead>
          <TableHead className="bg-white">Stok</TableHead>
          <TableHead className="bg-white">Kategori</TableHead>
          <TableHead className="bg-white text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow
            key={product.product_id}
            className="bg-white hover:bg-gray-50"
          >
            <TableCell className="bg-white">{index + 1}</TableCell>
            <TableCell className="bg-white">{product.name}</TableCell>
            <TableCell className="bg-white">{product.description}</TableCell>
            <TableCell className="bg-white">Rp{product.price.toLocaleString()}</TableCell>
            <TableCell className="bg-white">{product.stock}</TableCell>
            <TableCell className="bg-white">{product.category_id}</TableCell>
            <TableCell className="bg-white text-right space-x-2">
              <ProductFormModal
                product={product}
                onSubmit={handleUpdate}
                trigger={
                  <Button size="sm" variant="outline" className="bg-sky-400">
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
                      Yakin ingin menghapus produk ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak bisa dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(product.product_id)}
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
