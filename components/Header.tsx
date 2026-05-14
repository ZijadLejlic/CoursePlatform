import { signOutAction } from "@/actions/auth";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";

export async function Header() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link href="/" className="site-logo">
          <span className="site-logo-mark">L</span>
          <span>LearnHub</span>
        </Link>

        <form action="/search" method="get" className="header-search">
          {/* <label htmlFor="header-search-q">Search courses</label> */}
          <input
            type="search"
            id="header-search-q"
            name="q"
            placeholder="Search courses..."
            className="input header-search-input"
            autoComplete="off"
          />

          <button type="submit" className="btn btn-primary btn-sm">
            Search
          </button>
        </form>

        <nav className="site-nav">
          <Link href="/" className="site-nav-link">
            Home
          </Link>
          <Link href="/courses" className="site-nav-link">
            Courses
          </Link>
          <Link href="/instructors" className="site-nav-link">
            Instructors
          </Link>

          {user ? (
            <form action={signOutAction}>
              <button type="submit">Logout</button>
            </form>
          ) : (
            <>
              <Link href="/login" className="site-nav-link">
                Login
              </Link>
              <Link href="/register" className="site-nav-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
