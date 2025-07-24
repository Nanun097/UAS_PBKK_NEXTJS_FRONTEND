"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { createUser, deleteUser, fetchUsers, updateUser } from "@/lib/api";
import { Button } from "./ui/button";
import UserFormModal from "./UserFormModal";
import { toast } from "sonner";
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

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await deleteUser(id, token);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus user");
    }
  };

  const handleUpdate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await updateUser(data.id, data, token);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
      toast.success("User berhasil diupdate");
    } catch (err) {
      toast.error("Gagal mengupdate user");
    }
  };

  const handleCreate = async (data: any) => {
    const token = localStorage.getItem("token");
    try {
      await createUser(data, token);
      const updated = await fetchUsers();
      setUsers(updated);
      toast.success("User berhasil ditambahkan");
    } catch (err) {
      toast.error("Gagal menambahkan user");
    }
  };

 return (
  <div className="rounded-md border p-4 space-y-4 bg-white">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Daftar User</h2>
      <UserFormModal
        onSubmit={handleCreate}
        trigger={<Button>+ Tambah</Button>}
      />
    </div>
    <Table className="bg-white rounded-md shadow-sm">
      <TableHeader>
        <TableRow className="bg-white">
          <TableHead className="w-[50px] bg-white">#</TableHead>
          <TableHead className="bg-white">Nama</TableHead>
          <TableHead className="bg-white">Email</TableHead>
          <TableHead className="bg-white">Username</TableHead>
          <TableHead className="text-right bg-white">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id} className="bg-white hover:bg-gray-50">
            <TableCell className="bg-white">{index + 1}</TableCell>
            <TableCell className="bg-white">{user.name}</TableCell>
            <TableCell className="bg-white">{user.email}</TableCell>
            <TableCell className="bg-white">{user.username}</TableCell>
            <TableCell className="text-right space-x-2 bg-white">
              <UserFormModal
                user={user}
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
                      Yakin ingin menghapus user ini?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak bisa dibatalkan. Data akan hilang permanen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(user.id)}
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
