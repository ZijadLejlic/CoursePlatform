import { getCourseBySlug, getInstructorBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import Link from "next/link";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const instructor = getInstructorBySlug(course.instructorSlug);
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
            <div className="lesson-block">
              <h2 className="title-section">What you will learn</h2>
              <ol>
                {course.lessons.map((lesson, idx) => (
                  <li key={lesson} className="lesson-item">
                    <span className="lesson-num">{idx + 1}</span>
                    <span className="lesson-text">{lesson}</span>
                  </li>
                ))}
              </ol>
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
                <div>
                  <dt>Lesson</dt>
                  <dd>{course.lessonsCount}</dd>
                </div>
              </dl>
            </div>

            {instructor ? (
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
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
