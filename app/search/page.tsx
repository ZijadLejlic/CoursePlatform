import type { Course } from "@/lib/data";
import { headers } from "next/headers";

async function fetchCoursesFromApi(q: string): Promise<{
  count: number;
  courses: Course[];
} | null> {
  const headerList = await headers();
  const host = headerList.get("host") ?? "localhost:3000";
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  const url = `${proto}://${host}/api/courses?q=${encodeURIComponent(q)}`;

  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) return null;
  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const sp = await searchParams;
  const raw = sp.q;
  const trimmed = raw ? raw.trim() : "";

  const data = await fetchCoursesFromApi(trimmed);

  if (!data) {
    return <p>Failed to load courses</p>;
  }

  const { count, courses } = data;

  return (
    <section className="pad-section">
      <h3>Found {count} course</h3>
      {courses.map((c) => (
        <h2 key={c.id}>{c.title}</h2>
      ))}
    </section>
  );
}
