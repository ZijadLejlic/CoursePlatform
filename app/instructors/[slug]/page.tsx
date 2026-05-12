import { getCoursesByInstructor, getInstructorBySlug } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default async function InstructorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const instructor = getInstructorBySlug(slug);

  if (!instructor) notFound();

  const taughtCourses = getCoursesByInstructor(instructor.slug);

  return (
    <section className="pad-section">
      <div className="container">
        <nav className="back-nav">
          <Link href="/instructors">Back to instructors</Link>
        </nav>

        <div className="profile-hero">
          <div className="avatar avatar-lg">{initials(instructor.name)}</div>
          <div className="profile-body">
            <p className="eyebrows">{instructor.specialty}</p>
            <h1 className="title-display">{instructor.name}</h1>
            <p className="text-muted-sm max-prose">{instructor.bio}</p>
          </div>
        </div>

        <div className="courses-below">
          <h2 className="title-section">
            Courses by {instructor.name.split(" ")[0]}
          </h2>

          {taughtCourses.length == 0 ? (
            <span> No courses</span>
          ) : (
            <div className="grid-cards mt-sm">
              {taughtCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.slug}`}
                  className="card-link"
                >
                  <div className="badge-row">
                    <span className="badge badge--brand">
                      {course.category}
                    </span>
                    <span className="badge">{course.level}</span>
                  </div>
                  <h3 className="card-link-title">{course.title}</h3>
                  <p className="card-link-body">{course.shortDescription}</p>
                  <dl className="card-meta">
                    <div>
                      <dt>Lessons</dt>
                      <dd>{course.lessonsCount}</dd>
                    </div>
                    <div>
                      <dt>Duration</dt>
                      <dd>{course.duration}</dd>
                    </div>
                  </dl>

                  <div className="card-footer">
                    <span>By {instructor.name}</span>
                    <span className="card-footer-cta">View Course</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
