import Link from "next/link";
import { Badge } from "./Badge";
import type { Course } from "@/lib/data";

export function CourseCard({
  course,
  instructorName,
}: {
  course: Course;
  instructorName: string;
}) {
  return (
    <Link
      key={course.id}
      href={`/courses/${course.slug}`}
      className="card-link"
    >
      <div className="badge-row">
        <Badge variant="brand">{course.category}</Badge>
        <Badge>{course.level}</Badge>
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
        <span>By {instructorName}</span>
        <span className="card-footer-cta">View Course</span>
      </div>
    </Link>
  );
}
