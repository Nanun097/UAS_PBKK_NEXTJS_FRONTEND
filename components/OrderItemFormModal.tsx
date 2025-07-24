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
import { fetchOrders, fetchProducts } from "@/lib/api";

interface OrderItem {
  id?: number;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}

interface Order {
  order_id: string;
}

interface Product {
  product_id: string;
  name?: string;
}

interface Props {
  orderItem?: OrderItem;
  onSubmit: (data: OrderItem) => void;
  trigger: React.ReactNode;
}

export default function OrderItemFormModal({ orderItem, onSubmit, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<OrderItem>(
    orderItem ?? {
      order_id: "",
      product_id: "",
      quantity: 1,
      price: 0,
    }
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const accentColor = "hsl(27, 96%, 61%)";

  useEffect(() => {
    const fetchData = async () => {
      const ordersData = await fetchOrders();
      const productsData = await fetchProducts();
      setOrders(ordersData);
      setProducts(productsData);
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "quantity" || name === "price") {
      const num = parseInt(value);
      setForm((prev) => ({
        ...prev,
        [name]: isNaN(num) ? 0 : num,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelect = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.order_id || !form.product_id || form.quantity <= 0 || form.price < 0) {
      alert("Mohon isi semua field dengan benar.");
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
            {orderItem ? "Edit Item Pesanan" : "Tambah Item Pesanan"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label
              htmlFor="order_id"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Pilih Order
            </Label>
            <Select
              value={form.order_id}
              onValueChange={(val) => handleSelect("order_id", val)}
            >
              <SelectTrigger
                id="order_id"
                className="border"
                style={{ borderColor: accentColor }}
              >
                <SelectValue placeholder="Pilih Order" />
              </SelectTrigger>
              <SelectContent>
                {orders.map((order) => (
                  <SelectItem key={order.order_id} value={order.order_id}>
                    {order.order_id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
              onValueChange={(val) => handleSelect("product_id", val)}
            >
              <SelectTrigger
                id="product_id"
                className="border"
                style={{ borderColor: accentColor }}
              >
                <SelectValue placeholder="Pilih Produk" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.product_id} value={product.product_id}>
                    {product.name ? `${product.name} (${product.product_id})` : product.product_id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label
              htmlFor="quantity"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Jumlah
            </Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              value={form.quantity === 0 ? "" : form.quantity}
              onChange={handleChange}
              placeholder="Masukkan jumlah produk"
              min={1}
              style={{ borderColor: accentColor }}
              className="focus:ring-2"
            />
          </div>
          <div>
            <Label
              htmlFor="price"
              className="font-medium"
              style={{ color: accentColor }}
            >
              Harga (Rp)
            </Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={form.price === 0 ? "" : form.price}
              onChange={handleChange}
              placeholder="Masukkan harga produk"
              min={0}
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
              {orderItem ? "Simpan Perubahan" : "Tambah"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
