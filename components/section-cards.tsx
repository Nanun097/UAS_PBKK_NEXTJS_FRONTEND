"use client";

import { useEffect, useState } from "react";
import { fetchDashboardCounts } from "@/lib/api";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  const [counts, setCounts] = useState({
    users: 0,
    customers: 0,
    product: 0,
    orders: 0,
    orderItem: 0,
    categories: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDashboardCounts();
        setCounts({
          users: data.users,
          customers: data.customers,
          product: data.product,
          orders: data.orders,
          orderItem: data["order-item"],
          categories: data.categories,
        });
      } catch (err) {
        console.error("Gagal mengambil data dashboard:", err);
      }
    };

    load();
  }, []);

  const cardStyle = {
    backgroundColor: "transparent",
    border: "2px solid hsla(34.3, 100%, 70%, 0.6)",
    borderRadius: "1rem",
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Card Template */}
      {[
        { label: "Total Pengguna", value: counts.users, trend: "+12%", trendUp: true, footer: "Pengguna terdaftar" },
        { label: "Total Customer", value: counts.customers, trend: "-5%", trendUp: false, footer: "Data pelanggan" },
        { label: "Total Produk", value: counts.product, trend: "+8%", trendUp: true, footer: "Jumlah produk UMKM" },
        { label: "Total Pesanan", value: counts.orders, trend: "+4%", trendUp: true, footer: "Pesanan masuk" },
        { label: "Total Item Pesanan", value: counts.orderItem, trend: "+6%", trendUp: true, footer: "Detail pesanan produk" },
        { label: "Total Kategori", value: counts.categories, trend: "+2%", trendUp: true, footer: "Kategori produk" },
      ].map((card, i) => (
        <Card key={i} className="@container/card w-full min-w-[250px]" style={cardStyle}>
          <CardHeader>
            <CardDescription>{card.label}</CardDescription>
            <CardTitle className="text-2xl font-semibold">{card.value}</CardTitle>
            <CardAction>
              <Badge className={card.trendUp ? "bg-black text-white" : "bg-red-500 text-white"}>
                {card.trendUp ? <IconTrendingUp /> : <IconTrendingDown />} {card.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="text-sm">{card.footer}</CardFooter>
        </Card>
      ))}
    </div>
  );
}
