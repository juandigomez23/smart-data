"use client"

import { useState, Fragment, ReactNode } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, User, Home, Users, Settings, FileText, BarChart } from "lucide-react"
import { Transition } from "@headlessui/react"

interface NavItem {
  name: string
  href?: string
  icon: ReactNode
  children?: NavItem[]
}

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession()
  const role = session?.user?.role
  const pathname = usePathname()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarOpenMenus, setSidebarOpenMenus] = useState<{ [key: string]: boolean }>({})
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)

  const navItems: NavItem[] = [
    { name: "Inicio", href: "/", icon: <Home className="w-5 h-5" /> },
  ]

  if (role === "admin") {
    navItems.push(
      { name: "Dashboard", href: "/admin", icon: <BarChart className="w-5 h-5" /> },
      {
        name: "Usuarios",
        icon: <Users className="w-5 h-5" />,
        children: [
          { name: "Listado", href: "/admin/users", icon: <Users className="w-4 h-4" /> },
          { name: "Configuración", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
        ],
      }
    )
  }

  if (role === "asesor") {
    navItems.push(
      { name: "Dashboard", href: "/asesor", icon: <BarChart className="w-5 h-5" /> },
      { name: "Clientes", href: "/asesor/clients", icon: <Users className="w-5 h-5" /> }
    )
  }

  if (role === "auditor") {
    navItems.push(
      { name: "Dashboard", href: "/auditor", icon: <BarChart className="w-5 h-5" /> },
      { name: "Reportes", href: "/auditor/reports", icon: <FileText className="w-5 h-5" /> }
    )
  }

  const toggleSidebarMenu = (name: string) => {
    setSidebarOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const renderSidebarItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0
    const isOpen = sidebarOpenMenus[item.name]

    const linkClasses = (href: string) =>
      `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
        pathname === href
          ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-glow"
          : "hover:bg-gray-800 text-gray-100"
      }`

    return (
      <div key={item.name} className="flex flex-col">
        <button
          className={`${linkClasses(item.href || "#")} w-full justify-between`}
          onClick={() => hasChildren && toggleSidebarMenu(item.name)}
        >
          <div className="flex items-center gap-3">{item.icon}{!sidebarCollapsed && <span>{item.name}</span>}</div>
          {!sidebarCollapsed && hasChildren && (isOpen ? <ChevronDown className="w-4 h-4 rotate-180" /> : <ChevronDown className="w-4 h-4" />)}
        </button>
        {hasChildren && isOpen && (
          <div className="ml-6 mt-1 flex flex-col space-y-1">
            {item.children!.map((child) => (
              <Link key={child.name} href={child.href!} className={linkClasses(child.href!)}>
                <div className="flex items-center gap-2">{child.icon} {!sidebarCollapsed && child.name}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-gray-100 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "w-20" : "w-64"} shadow-xl`}>
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-700">
          {!sidebarCollapsed && <span className="text-2xl font-bold">Smart Data</span>}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1 rounded hover:bg-gray-800 transition">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {navItems.map(renderSidebarItem)}
        </nav>

        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-t border-gray-700 text-sm text-gray-400">
            Smart Data © 2025
          </div>
        )}
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md relative">
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded hover:bg-blue-500 transition">
              <Menu size={24} />
            </button>
            <span className="font-bold text-lg">Smart Data</span>
          </div>

          <div className="hidden md:flex gap-3 items-center">
            {navItems.map((item) =>
              item.href ? (
                <Link key={item.href} href={item.href} className={`px-3 py-1 rounded transition-all duration-200 ${pathname === item.href ? "bg-blue-700 font-semibold shadow-glow" : "hover:bg-blue-500"}`}>
                  {item.name}
                </Link>
              ) : null
            )}
          </div>

          {session && (
            <div className="hidden md:flex relative">
              <button onClick={() => setUserDropdown(!userDropdown)} className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-500 transition">
                <User className="w-5 h-5" />
                {session.user?.name || "Usuario"}
                <ChevronDown className="w-4 h-4" />
              </button>
              <Transition as={Fragment} show={userDropdown} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Perfil</Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left px-4 py-2 hover:bg-gray-100">Cerrar sesión</button>
                </div>
              </Transition>
            </div>
          )}
        </nav>

        {/* Mobile Navbar */}
        <Transition as={Fragment} show={mobileMenuOpen} enter="transition ease-out duration-300" enterFrom="opacity-0 -translate-y-2" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-200" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 -translate-y-2">
          <div className="md:hidden bg-blue-600 flex flex-col gap-1 p-2">
            {navItems.map((item) =>
              item.href ? (
                <Link key={item.href} href={item.href} className={`px-3 py-1 rounded transition-all duration-200 ${pathname === item.href ? "bg-blue-700 font-semibold shadow-glow" : "hover:bg-blue-500"}`} onClick={() => setMobileMenuOpen(false)}>
                  {item.name}
                </Link>
              ) : null
            )}
            {session && (
              <>
                <Link href="/profile" className="px-3 py-1 rounded hover:bg-blue-500 transition" onClick={() => setMobileMenuOpen(false)}>Perfil</Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="px-3 py-1 rounded hover:bg-red-600 transition text-white">Cerrar sesión</button>
              </>
            )}
          </div>
        </Transition>

        <main className="flex-1 overflow-auto bg-gray-100 p-4">{children}</main>
      </div>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
        }
      `}</style>
    </div>
  )
}
