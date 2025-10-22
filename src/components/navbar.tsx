"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, User } from "lucide-react"
import { useState, Fragment } from "react"
import { Transition } from "@headlessui/react"

export default function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)

  const role = session?.user?.role

  let navItems = [] as { name: string; href: string }[];
  if (role === "admin") {
    navItems = [
      { name: "Dashboard", href: "/admin" },
      { name: "Usuarios", href: "/admin/users" },
      { name: "Configuración", href: "/admin/settings" },
    ];
  } else if (role === "asesor") {
    navItems = [
      { name: "Dashboard", href: "/asesor" },
      { name: "Clientes", href: "/asesor/clients" },
    ];
  }

  const navLinkClass = (href: string) =>
    `px-3 py-1 rounded transition-all duration-200 ${
      pathname === href
        ? "bg-blue-700 font-semibold shadow-glow text-white"
        : "hover:bg-blue-500 hover:shadow-glow hover:text-white"
    }`

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center relative shadow-md">
      
      <Link href="/" className="font-bold text-lg">
      
      </Link>

      
      <div className="hidden md:flex gap-3 items-center">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={navLinkClass(item.href)}>
            {item.name}
          </Link>
        ))}
      </div>

      
      {session && (
        <div className="hidden md:flex relative">
          <button
            onClick={() => setUserDropdown(!userDropdown)}
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-blue-500 transition"
          >
            <User className="w-5 h-5" />
            {session.user?.name || "Usuario"}
            <ChevronDown className="w-4 h-4" />
          </button>
          <Transition
            as={Fragment}
            show={userDropdown}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Perfil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          </Transition>
        </div>
      )}

      
      <button
        className="md:hidden p-2 rounded hover:bg-blue-500 transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={24} />
      </button>

      
      <Transition
        as={Fragment}
        show={menuOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div className="absolute top-full left-0 w-full bg-blue-600 flex flex-col md:hidden z-50 p-2 gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${navLinkClass(item.href)} w-full text-left`}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {session ? (
            <div className="flex flex-col gap-1 mt-2">
              <Link
                href="/profile"
                className="px-3 py-1 rounded hover:bg-blue-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Perfil
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="px-3 py-1 rounded hover:bg-red-600 transition text-white"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-1 rounded hover:bg-green-600 transition text-white mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </Transition>

      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 8px rgba(0, 123, 255, 0.6);
        }
      `}</style>
    </nav>
  )
}
