"use client";

import Link from "next/link";
import { instructors, type Course } from "@/lib/data";

function instructorNameForCourse(course: Course): string {
  return (
    instructors.find((i) => i.slug === course.instructorSlug)?.name ??
    "Unknown instructor"
  );
}

export default function CoursesCatalogClient({
  courses,
  categories,
  levels,
}: {
  courses: Course[];
  categories: string[];
  levels: string[];
}) {
  return (
    <div className="stack-md">
      <div className="grid-cards">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="card-link"
          >
            <div className="badge-row">
              <span className="badge badge--brand">{course.category}</span>
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
              <span>By {instructorNameForCourse(course)}</span>
              <span className="card-footer-cta">View Course</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
