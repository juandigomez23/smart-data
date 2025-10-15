"use client"

import Link from "next/link"
import { ArrowRight, Lock, BarChart, FileText } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Smart Data
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </Link>
      </nav>

      
      <section className="flex flex-col items-center text-center mt-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Bienvenid@ a <span className="text-blue-600">Smart Data</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Plataforma inteligente para la gestión de <b>formularios</b>.
          Optimiza tu tiempo con una interfaz moderna y segura.
        </p>
        <Link
          href="/login"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Iniciar Sesión <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-20 px-6">
        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <Lock className="w-10 h-10 text-blue-600 mb-3" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Seguridad</h3>
          <p className="text-gray-600 text-sm">
            Acceso protegido con roles personalizados para <b>admins y asesores</b>.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <FileText className="w-10 h-10 text-green-600 mb-3" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Formularios Inteligentes</h3>
          <p className="text-gray-600 text-sm">
            Formularios dinámicos para gestionar retenciones y más.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
          <BarChart className="w-10 h-10 text-purple-600 mb-3" />
          <h3 className="font-bold text-lg text-gray-800 mb-2">Dashboard</h3>
          <p className="text-gray-600 text-sm">
            Visualiza métricas y resultados en un panel moderno y responsive.
          </p>
        </div>
      </section>

      
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Smart Data. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-6 mt-3 text-sm">
          <Link href="/about" className="hover:text-white">Sobre nosotros</Link>
          <Link href="/privacy" className="hover:text-white">Privacidad</Link>
          <Link href="/contact" className="hover:text-white">Contacto</Link>
        </div>
      </footer>
    </div>
  )
}
