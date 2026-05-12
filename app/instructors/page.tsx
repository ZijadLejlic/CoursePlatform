import { getAllInstructors } from "@/lib/data";
import Link from "next/link";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Instructors() {
  const instractorsList = getAllInstructors();
  return (
    <section className="pad-section">
      <div className="container">
        <div className="stack">
          <div className="section-head">
            <span className="eyebrow">Team</span>
            <h2 className="title-page">Meet the instructors</h2>
            <p className="text-muted max-prose">
              Working engineers and designers who teach the courses you see on
              LearnHub.
            </p>
          </div>

          <div className="grid-cards">
            {instractorsList.map((instructor) => (
              <Link
                key={instructor.id}
                href={`/instructors/${instructor.slug}`}
                className="card-link"
              >
                <div className="instructor-row">
                  <div className="avatar">{initials(instructor.name)}</div>
                  <div>
                    <h3 className="instructor-card-name">{instructor.name}</h3>
                    <p className="instructor-card-role">
                      {instructor.specialty}
                    </p>
                  </div>
                </div>

                <p className="instructor-card-bio">{instructor.shortBio}</p>

                <span className="instructor-card-cta">View profile</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
