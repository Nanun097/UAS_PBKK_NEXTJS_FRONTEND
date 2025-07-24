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
import { fetchCustomers } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  order_id?: string;
  customer_id: string;
  order_date: string;
  total_amount: number;
  status: string;
}

interface OrderFormModalProps {
  order?: Order;
  onSubmit: (order: Order) => void;
  trigger: React.ReactNode;
}

interface Customer {
  customer_id: string;
  name: string;
}

export default function OrderFormModal({
  order,
  onSubmit,
  trigger,
}: OrderFormModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Order>({
    customer_id: "",
    order_date: "",
    total_amount: 0,
    status: "",
  });

  const [customers, setCustomers] = useState<Customer[]>([]);

  const accentColor = "hsl(27, 96%, 61%)";

  const statusOptions = ["pending", "diproses", "selesai", "batal"];

  // Fetch data customer
  useEffect(() => {
    fetchCustomers()
      .then(setCustomers)
      .catch((err) => console.error("Failed to fetch customers", err));
  }, []);

  // Isi form jika edit
  useEffect(() => {
    if (order) {
      setFormData({
        customer_id: order.customer_id || "",
        order_date: order.order_date || "",
        total_amount: order.total_amount ?? 0,
        status: order.status || "",
      });
    }
  }, [order]);

  // Tangani input perubahan
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "total_amount") {
      const number = parseFloat(value);
      setFormData({ ...formData, [name]: isNaN(number) ? 0 : number });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Untuk status select
  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  // Submit form
  const handleSubmit = () => {
    if (
      !formData.customer_id.trim() ||
      !formData.order_date.trim() ||
      !formData.status.trim()
    ) {
      return;
    }

    onSubmit(formData);
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
            {order ? "Edit Order" : "Tambah Order"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Select Customer */}
          <div>
            <Label
              htmlFor="customer_id"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Pilih Customer
            </Label>
            <Select
              value={formData.customer_id}
              onValueChange={(value) =>
                setFormData({ ...formData, customer_id: value })
              }
            >
              <SelectTrigger
                id="customer_id"
                className="border"
                style={{ borderColor: accentColor }}
              >
                <SelectValue placeholder="Pilih Customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((cust) => (
                  <SelectItem key={cust.customer_id} value={cust.customer_id}>
                    {cust.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tanggal Order */}
          <div>
            <Label
              htmlFor="order_date"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Tanggal Order
            </Label>
            <Input
              type="date"
              id="order_date"
              name="order_date"
              value={formData.order_date}
              onChange={handleChange}
              style={{ borderColor: accentColor }}
              className="focus:ring-2"
              placeholder="Pilih tanggal order"
            />
          </div>

          {/* Total Amount */}
          <div>
            <Label
              htmlFor="total_amount"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Total Amount (Rp)
            </Label>
            <Input
              type="number"
              id="total_amount"
              name="total_amount"
              value={formData.total_amount === 0 ? "" : formData.total_amount}
              onChange={handleChange}
              style={{ borderColor: accentColor }}
              className="focus:ring-2"
              placeholder="Masukkan total amount"
            />
          </div>

          {/* Status (Select) */}
          <div>
            <Label
              htmlFor="status"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Status Order
            </Label>
            <Select
              value={formData.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger
                id="status"
                className="border"
                style={{ borderColor: accentColor }}
              >
                <SelectValue placeholder="Pilih status order" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              {order ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
