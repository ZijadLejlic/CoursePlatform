"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signUpAction(formData: FormData) {
  const firstName = String(formData.get("first_name"));
  const lastname = String(formData.get("last_name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const country = String(formData.get("country"));
  const skillLevel = String(formData.get("skill_level"));

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Not successful!");
  }

  const fullName = `${firstName} ${lastname}`;

  const { error: profileError } = await supabase.from("students").insert({
    user_uuid: data.user.id,
    full_name: fullName,
    country,
    skill_level: skillLevel,
  });

  if (profileError) {
    console.log("PROFILE ERROR:", profileError);
    return;
  }

  redirect("/courses");
}

// 54:00
