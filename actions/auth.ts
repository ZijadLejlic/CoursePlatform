"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export type AuthActionState = { error?: string } | undefined;

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
    return { error: error.message };
  }

  if (!data.user) {
    return { error: "Not successful!" };
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

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function signInAction(
  _prev: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!email || !password) {
    return { error: "Email and pass are required!" };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/courses");
}
