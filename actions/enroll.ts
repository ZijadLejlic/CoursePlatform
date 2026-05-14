"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { afterEach } from "node:test";

export async function enrollCourseAction(formData: FormData) {
  const rawId = Number(formData.get("course_id"));
  const studentId = Number(formData.get("student_id"));

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let student = null;
  let enrolled = false;

  if (user) {
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("id")
      .eq("user_uuid", user.id)
      .single();

    if (!students) return;

    const studentId = student.id;
  }

  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("enrollments").insert({
    student_id = studentId,
    course_id = rawId,
  });
}
