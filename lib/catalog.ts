import { createServerSupabaseClient } from "@/utils/supabase/server";
import type { CatalogCourse, CourseDetail, InstructorPublic } from "@/lib/types";

type InstructorRow = {
  id: number;
  slug: string;
  full_name: string;
  specialty: string;
  short_bio: string | null;
  bio: string | null;
};

type CourseRow = {
  id: number;
  slug: string;
  title: string;
  category: string;
  level: string;
  status: string;
  description: string;
  short_description: string | null;
  duration: string | null;
  instructor: InstructorRow | InstructorRow[] | null;
};

function pickInstructor(
  ins: InstructorRow | InstructorRow[] | null | undefined,
): InstructorRow | null {
  if (ins == null) return null;
  return Array.isArray(ins) ? ins[0] ?? null : ins;
}

const courseSelect = `
  id,
  slug,
  title,
  category,
  level,
  status,
  description,
  short_description,
  duration,
  instructor:instructors (
    id,
    slug,
    full_name,
    specialty,
    short_bio,
    bio
  )
` as const;

function mapCourseRow(row: CourseRow): CatalogCourse {
  const ins = pickInstructor(row.instructor);
  const name = ins?.full_name?.trim() || "TBA";
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    shortDescription:
      row.short_description?.trim() ||
      row.description.slice(0, 160).trim() + (row.description.length > 160 ? "…" : ""),
    description: row.description,
    category: row.category,
    level: row.level,
    duration: row.duration,
    instructorName: name,
    instructorSlug: ins?.slug ?? null,
  };
}

function mapDetail(row: CourseRow): CourseDetail {
  const base = mapCourseRow(row);
  const ins = pickInstructor(row.instructor);
  return {
    ...base,
    numericId: row.id,
    instructor: ins
      ? {
          id: String(ins.id),
          slug: ins.slug,
          name: ins.full_name,
          specialty: ins.specialty,
          shortBio: ins.short_bio?.trim() || "",
          bio: ins.bio?.trim() || "",
        }
      : null,
  };
}

export async function getPublishedCourses(): Promise<CatalogCourse[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select(courseSelect)
    .eq("status", "published")
    .order("title");

  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as CourseRow[]).map(mapCourseRow);
}

export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select(courseSelect)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return mapDetail(data as unknown as CourseRow);
}

export async function searchPublishedCourses(q: string): Promise<CatalogCourse[]> {
  const needle = q.trim();
  if (!needle) return [];

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select(courseSelect)
    .eq("status", "published")
    .ilike("title", `%${needle}%`)
    .order("title");

  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as CourseRow[]).map(mapCourseRow);
}

export async function getCourseCategoriesAndLevels(): Promise<{
  categories: string[];
  levels: string[];
}> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("courses")
    .select("category, level")
    .eq("status", "published");

  if (error) throw new Error(error.message);
  const rows = data ?? [];
  const categories = Array.from(new Set(rows.map((r) => r.category))).sort();
  const levels = Array.from(new Set(rows.map((r) => r.level))).sort();
  return { categories, levels };
}

export async function getInstructorsPublic(): Promise<InstructorPublic[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("instructors")
    .select("id, slug, full_name, specialty, short_bio, bio")
    .eq("status", "active")
    .order("full_name");

  if (error) throw new Error(error.message);
  return (
    data?.map((r) => ({
      id: String(r.id),
      slug: r.slug,
      name: r.full_name,
      specialty: r.specialty,
      shortBio: r.short_bio?.trim() || "",
      bio: r.bio?.trim() || "",
    })) ?? []
  );
}

export async function getInstructorBySlug(
  slug: string,
): Promise<InstructorPublic | null> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("instructors")
    .select("id, slug, full_name, specialty, short_bio, bio")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return {
    id: String(data.id),
    slug: data.slug,
    name: data.full_name,
    specialty: data.specialty,
    shortBio: data.short_bio?.trim() || "",
    bio: data.bio?.trim() || "",
  };
}

export async function getPublishedCoursesByInstructorSlug(
  instructorSlug: string,
): Promise<CatalogCourse[]> {
  const supabase = await createServerSupabaseClient();
  const { data: ins, error: e1 } = await supabase
    .from("instructors")
    .select("id")
    .eq("slug", instructorSlug)
    .eq("status", "active")
    .maybeSingle();

  if (e1) throw new Error(e1.message);
  if (!ins) return [];

  const { data, error } = await supabase
    .from("courses")
    .select(courseSelect)
    .eq("status", "published")
    .eq("instructor_id", ins.id)
    .order("title");

  if (error) throw new Error(error.message);
  return ((data ?? []) as unknown as CourseRow[]).map(mapCourseRow);
}

type EnrolledRow = {
  enrolled_at: string;
  courses: CourseRow | CourseRow[] | null;
};

function pickCourse(
  c: CourseRow | CourseRow[] | null | undefined,
): CourseRow | null {
  if (c == null) return null;
  return Array.isArray(c) ? c[0] ?? null : c;
}

export async function getMyEnrolledCourses(userId: string): Promise<CatalogCourse[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("enrollments")
    .select(`enrolled_at, courses (${courseSelect})`)
    .eq("student_id", userId)
    .order("enrolled_at", { ascending: false });

  if (error) throw new Error(error.message);
  const rows = (data as EnrolledRow[] | null) ?? [];
  return rows
    .map((r) => pickCourse(r.courses))
    .filter(Boolean)
    .map((c) => mapCourseRow(c as CourseRow));
}
