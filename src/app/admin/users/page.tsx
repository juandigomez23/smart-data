"use client"

import { useState } from "react"

type User = {
  id: number
  name: string
  role: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Juan Pérez", role: "asesor" },
    { id: 2, name: "Ana Gómez", role: "auditor" },
  ])

  const removeUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestión de usuarios</h1>
      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Rol</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.name}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3 space-x-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded">
                  Editar
                </button>
                <button
                  onClick={() => removeUser(u.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
