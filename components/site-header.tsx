import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { NavUser } from "@/components/nav-user"

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function SiteHeader() {
  return (
    <header className="flex h-[var(--header-height)] items-center justify-between border-b px-4 lg:px-6">
      {/* Kiri: Sidebar Trigger dan Judul */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Menu Utama</h1>
      </div>

      {/* Kanan: Informasi User */}
      <div className="flex items-center gap-4">
        <NavUser user={user} />
      </div>
    </header>
  )
}
