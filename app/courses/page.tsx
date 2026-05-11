import CoursesCatalogClient from "./courses-catalog-client";
import {
  getAllCourses,
  getCourseCategories,
  getCourseLevels,
} from "@/lib/data";

export default function Courses() {
  const courses = getAllCourses();

  const categories = getCourseCategories();
  const levels = getCourseLevels();

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

          <CoursesCatalogClient
            courses={courses}
            categories={categories}
            levels={levels}
          ></CoursesCatalogClient>
        </div>
      </div>
    </section>
  );
}
