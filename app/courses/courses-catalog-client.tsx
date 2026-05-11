"use client";

import Link from "next/link";
import { instructors, type Course } from "@/lib/data";
import { useState } from "react";

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
  const [level, setLevel] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("all");

  return (
    <div className="stack-md">
      <div className="panel">
        <div className="grid-filters">
          <div className="field">
            <label htmlFor="course-search" className="field-label">
              Search by title
            </label>
            <input
              id="course-search"
              type="text"
              className="input"
              placeholder="e.g. Next.js"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
          <div className="field">
            <label htmlFor="course-category" className="field-label">
              Category
            </label>
            <select
              id="course-category"
              className="select"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="course-level" className="field-label">
              Level
            </label>
            <select
              id="course-level"
              className="select"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            >
              <option value="all">All</option>
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
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
