import Link from "next/link";

export default function Courses() {
  return (
    <section className="pad-section">
      <div className="container">
        <div className="stack">
          <div className="section-head">
            <span className="eyebrow">Catalog</span>
            <h2 className="title-page">All Courses</h2>
            <p className="text-muted max-prose">
              Browse every course in the catalog. Use the filters to narrow down
              by litle, category od level.
            </p>
          </div>

          <div className="stack-md">
            <div className="grid-cards">
              <Link href="#" className="card-link">
                <div className="badge-row">
                  <span className="badge badge--brand">Web Development</span>
                  <span className="badge">Beginner</span>
                </div>

                <h3 className="card-link-title">HTML, CSS, course</h3>
                <p className="card-link-body">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab ex
                  voluptatum maxime et inventore natus dicta.
                </p>

                <dl className="card-meta">
                  <div>
                    <dt>Lessons</dt>
                    <dd>12</dd>
                  </div>
                  <div>
                    <dt>Duration</dt>
                    <dd>23h</dd>
                  </div>
                </dl>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
