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
  fetchOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "@/lib/api";

import OrderItemFormModal from "./OrderItemFormModal"; // Modal untuk tambah/edit order item

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

interface OrderItem {
  id?: number;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

export default function OrderItemList() {
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetchOrderItems().then((data) => {
      setItems(data);
    });
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await deleteOrderItem(id, token);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Item pesanan berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus item pesanan");
    }
  };

  const handleCreate = async (data: OrderItem) => {
  const token = localStorage.getItem("token");
  try {
    await createOrderItem(data, token);
    const updated = await fetchOrderItems();
    setItems(updated);
    toast.success("Item pesanan berhasil ditambahkan");
  } catch (error) {
    console.error("Error saat menambahkan item pesanan:", error);
    toast.error("Gagal menambahkan item pesanan");
  }
};


  const handleUpdate = async (data: OrderItem) => {
    const token = localStorage.getItem("token");
    if (!data.id) return;
    try {
      await updateOrderItem(data.id, data, token);
      const updated = await fetchOrderItems();
      setItems(updated);
      toast.success("Item pesanan berhasil diperbarui");
    } catch {
      toast.error("Gagal memperbarui item pesanan");
    }
  };

  return (
  <div className="rounded-md border p-4 space-y-4 bg-white">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Daftar Item Pesanan</h2>
      <OrderItemFormModal onSubmit={handleCreate} trigger={<Button>+ Tambah</Button>} />
    </div>
    <Table className="bg-white rounded-md shadow-sm">
      <TableHeader>
        <TableRow className="bg-white">
          <TableHead className="bg-white">#</TableHead>
          <TableHead className="bg-white">Order ID</TableHead>
          <TableHead className="bg-white">Product ID</TableHead>
          <TableHead className="bg-white">Jumlah</TableHead>
          <TableHead className="bg-white">Harga</TableHead>
          <TableHead className="bg-white text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={item.id} className="bg-white hover:bg-gray-50">
            <TableCell className="bg-white">{index + 1}</TableCell>
            <TableCell className="bg-white">{item.order_id}</TableCell>
            <TableCell className="bg-white">{item.product_id}</TableCell>
            <TableCell className="bg-white">{item.quantity}</TableCell>
            <TableCell className="bg-white">Rp{item.price.toLocaleString()}</TableCell>
            <TableCell className="bg-white text-right space-x-2">
              <OrderItemFormModal
                orderItem={item}
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
                      Yakin ingin menghapus item pesanan ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak bisa dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(item.id!)}
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
