"use client"

import { useEffect, useState } from "react"
import { IconLogout } from "@tabler/icons-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/api"

export function NavUser() {
  const router = useRouter()
  const [user, setUser] = useState<{
    name: string
    email: string
    id: string
  } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Anda belum login!")
      router.push("/login-new")
      return
    }

    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setUser({
        name: "Admin",
        email: "Admin@example.com",
        id: "pppp",
      })
    }
  }, [])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token")
      await logout(token)
      toast.error("Logout berhasil")
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setTimeout(() => {
        router.push("/login")
      }, 1000)
    } catch (err) {
      toast.error("Gagal logout")
    }
  }

  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={handleLogout}
          className="gap-4 justify-between px-4 py-3 text-lg font-semibold"
        >
          <span>{user.name}</span>
          <IconLogout className="w-12 h-12 text-red-600" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
