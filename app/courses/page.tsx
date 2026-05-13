import CoursesCatalogClient from "@/components/CoursesCatalogClient";
import { SectionTitle } from "@/components/SectionTitle";
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
          <SectionTitle
            eyebrow="Catalog"
            title="All courses"
            description="Browse every course in the catalog. Use the filters to narrow down by title, category or level"
          />

          <CoursesCatalogClient
            courses={courses}
            categories={categories}
            levels={levels}
          />
        </div>
      </div>
    </section>
  );
}
