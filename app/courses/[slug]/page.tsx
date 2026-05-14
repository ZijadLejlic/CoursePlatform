import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { getCourseBySlug } from "@/lib/catalog";
import { enrollCourseAction } from "@/actions/enroll";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let student = null;
  let enrolled = false;

  if (user) {
    const { data: studentData } = await supabase
      .from("students")
      .select("id")
      .eq("user_uuid", user.id)
      .single();

    student = studentData;

    if (student) {
      const { data: enrollmentRow } = await supabase
        .from("enrollments")
        .select("id")
        .eq("student_id", student.id)
        .eq("course_id", course.id)
        .maybeSingle();

      enrolled = !!enrollmentRow;

      if (enrollmentRow) {
        enrolled = true;
      }
    }
  }

  const instructor = null;

  return (
    <section className="pad-section">
      <div className="container">
        <nav className="back-nav">
          <Link href="/courses">Back to Courses</Link>
        </nav>

        <div className="course-layout">
          <div>
            <div className="badge-row">
              <Badge variant="brand">{course.category}</Badge>
              <Badge>{course.level}</Badge>
              <Badge variant="success">{course.duration}</Badge>
            </div>

            <h1 className="title-display">{course.title}</h1>

            <p className="course-lede">{course.shortDescription}</p>

            <div className="text-block">
              <h2>About this course</h2>
              <p>{course.description}</p>
            </div>
          </div>

          <aside className="course-aside">
            <div className="sidebar-card">
              <p className="sidebar-label">At a glance</p>

              <dl className="meta-grid">
                <div>
                  <dt>Level</dt>
                  <dd>{course.level}</dd>
                </div>

                <div>
                  <dt>Category</dt>
                  <dd>{course.category}</dd>
                </div>

                <div>
                  <dt>Duration</dt>
                  <dd>{course.duration}</dd>
                </div>
              </dl>
            </div>

            {user ? (
              <>
                {enrolled ? (
                  <p>Already Enrolled</p>
                ) : (
                  <form action={enrollCourseAction}>
                    <input type="hidden" value={course.id} name="course_id" />
                    <input type="hidden" value={student.id} name="student_id" />
                    <button type="submit">Enroll</button>
                  </form>
                )}
              </>
            ) : null}

            {instructor && (
              <div className="sidebar-card">
                <p className="sidebar-label">Instructor</p>
                <p className="sidebar-instructor-name">{instructor.name}</p>
                <p className="sidebar-instructor-role">
                  {instructor.specialty}
                </p>
                <p className="text-muted-sm mt-sm">{instructor.shortBio}</p>
                <Link
                  href={`/instructors/${instructor.slug}`}
                  className="link-brand is-block"
                >
                  View Profile
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
