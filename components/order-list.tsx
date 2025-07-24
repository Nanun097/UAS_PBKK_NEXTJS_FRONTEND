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
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "@/lib/api";

import OrderFormModal from "./OrderFormModal"; // Modal untuk tambah/edit order

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

interface Order {
  order_id: string;
  customer_id: string;
  order_date: string;
  total_amount: number;
  status: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await deleteOrder(id, token);
      setOrders((prev) => prev.filter((order) => order.order_id !== id));
      toast.success("Data pesanan berhasil dihapus");
    } catch {
      toast.error("Gagal menghapus data pesanan");
    }
  };

  const handleCreate = async (data: Order) => {
    const token = localStorage.getItem("token");
    try {
      await createOrder(data, token);
      const updated = await fetchOrders();
      setOrders(updated);
      toast.success("Data pesanan berhasil ditambahkan");
    } catch {
      toast.error("Gagal menambahkan data pesanan");
    }
  };

  const handleUpdate = async (data: Order) => {
    const token = localStorage.getItem("token");
    try {
      await updateOrder(data.order_id, data, token);
      const updated = await fetchOrders();
      setOrders(updated);
      toast.success("Data pesanan berhasil diperbarui");
    } catch {
      toast.error("Gagal memperbarui data pesanan");
    }
  };

 return (
  <div className="rounded-md border p-4 space-y-4 bg-white">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Daftar Pesanan</h2>
      <OrderFormModal onSubmit={handleCreate} trigger={<Button>+ Tambah</Button>} />
    </div>
    <Table className="bg-white rounded-md shadow-sm">
      <TableHeader>
        <TableRow className="bg-white">
          <TableHead className="bg-white">#</TableHead>
          <TableHead className="bg-white">ID Pelanggan</TableHead>
          <TableHead className="bg-white">Tanggal Pesan</TableHead>
          <TableHead className="bg-white">Total</TableHead>
          <TableHead className="bg-white">Status</TableHead>
          <TableHead className="bg-white text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={order.order_id} className="bg-white hover:bg-gray-50">
            <TableCell className="bg-white">{index + 1}</TableCell>
            <TableCell className="bg-white">{order.customer_id}</TableCell>
            <TableCell className="bg-white">{order.order_date}</TableCell>
            <TableCell className="bg-white">Rp{order.total_amount.toLocaleString()}</TableCell>
            <TableCell className="bg-white">{order.status}</TableCell>
            <TableCell className="bg-white text-right space-x-2">
              <OrderFormModal
                order={order}
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
                      Yakin ingin menghapus pesanan ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak bisa dibatalkan.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(order.order_id)}
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
