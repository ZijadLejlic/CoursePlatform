import { getCoursesByInstructor, getInstructorBySlug } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseCard } from "@/components/CourseCard";

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
                <CourseCard
                  key={course.id}
                  course={course}
                  instructorName={instructor.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
