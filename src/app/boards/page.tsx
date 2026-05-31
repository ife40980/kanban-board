"use client"

import Link from "next/link"
import { useAuthenticationStatus } from "@nhost/react"
import { useGetBoardsQuery } from "@/graphql/__generated__"

export default function BoardsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuthenticationStatus()
  const { data, loading, error } = useGetBoardsQuery()

  if (authLoading) return <p className="p-6">Checking auth…</p>

  if (!isAuthenticated) {
    return <p className="p-6 text-red-600">You must be signed in to view boards.</p>
  }

  if (loading) return <p className="p-6">Loading boards…</p>
  if (error) return <p className="p-6 text-red-500">{error.message}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Your boards</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.boards.map((board) => (
          <Link
            key={board.id}
            href={`/boards/${board.id}`}
            className="group"
          >
            <div className="h-32 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500
                            text-white p-4 flex items-end font-semibold
                            shadow hover:brightness-110 transition">
              {board.name}
            </div>
          </Link>
        ))}

        {/* Create board tile */}
        <button
          className="h-32 rounded-lg bg-gray-100 hover:bg-gray-200
                     flex items-center justify-center font-medium
                     text-gray-700 transition"
        >
          + Create new board
        </button>
      </div>
    </div>
  )
}
