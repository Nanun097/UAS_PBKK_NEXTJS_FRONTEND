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
  fetchCustomers,
  deleteCustomer,
  createCustomer,
  updateCustomer,
} from "@/lib/api";
import { toast } from "sonner";
import CustomerFormModal from "./CustomerFormModal";
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

interface Customer {
  customer_id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers().then((data) => {
      console.log("Customer Data:", data);
      setCustomers(data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      await deleteCustomer(id, token);
      setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
      toast.success("Customer berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus customer");
    }
  };

  const handleCreate = async (data: Customer) => {
    const token = localStorage.getItem("token");
    try {
      await createCustomer(data, token);
      const updated = await fetchCustomers();
      setCustomers(updated);
      toast.success("Customer berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan customer");
    }
  };

  const handleUpdate = async (data: Customer) => {
    const token = localStorage.getItem("token");
    try {
      await updateCustomer(data.customer_id, data, token);
      const updated = await fetchCustomers();
      setCustomers(updated);
      toast.success("Customer berhasil diperbarui");
    } catch (err) {
      toast.error("Gagal memperbarui customer");
    }
  };

  return (
    <div className="rounded-md border p-4 space-y-4 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar Customer</h2>
        <CustomerFormModal
          onSubmit={handleCreate}
          trigger={<Button>+ Tambah</Button>}
        />
      </div>
      <Table className="bg-white rounded-md shadow-sm">
        <TableHeader>
          <TableRow className="bg-white">
            <TableHead className="bg-white">#</TableHead>
            <TableHead className="bg-white">Nama</TableHead>
            <TableHead className="bg-white">Email</TableHead>
            <TableHead className="bg-white">Telepon</TableHead>
            <TableHead className="bg-white">Alamat</TableHead>
            <TableHead className="bg-white text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, index) => (
            <TableRow
              key={customer.customer_id}
              className="bg-white hover:bg-gray-50"
            >
              <TableCell className="bg-white">{index + 1}</TableCell>
              <TableCell className="bg-white">{customer.name}</TableCell>
              <TableCell className="bg-white">{customer.email}</TableCell>
              <TableCell className="bg-white">{customer.phone}</TableCell>
              <TableCell className="bg-white">{customer.address}</TableCell>
              <TableCell className="bg-white text-right space-x-2">
                <CustomerFormModal
                  customer={customer}
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
                        Yakin ingin menghapus customer ini?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tindakan ini tidak bisa dibatalkan.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(customer.customer_id)}
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
