'use client'
import { useGetCountriesQuery } from '../../graphql/__generated__/generated'

export default function CountriesPage() {
  const { data, loading, error } = useGetCountriesQuery()

  if (loading) return <p>Loading…</p>
  if (error) return <p>Error: {error.message}</p>

  const countries = data?.countries ?? []

  return (
    <main className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">Countries</h1>
      <ul className="list-disc pl-6">
        {countries.map((c: { code: string; name: string }) => (
          <li key={c.code}>{c.name}</li>
        ))}
      </ul>
    </main>
  )
}