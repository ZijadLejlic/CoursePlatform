import { signUpAction } from "@/actions/auth";
import { SectionTitle } from "@/components/SectionTitle";

export default function Courses() {
  return (
    <section className="pad-section">
      <div className="container">
        <div className="stack">
          <SectionTitle
            eyebrow="students"
            title="Create an account"
            description="All fields are required!"
          ></SectionTitle>

          <form action={signUpAction} className="stack-md panel">
            <div className="field">
              <input
                className="input"
                type="text"
                name="first_name"
                placeholder="First Name"
              />
            </div>
            <div className="field">
              <input
                className="input"
                type="text"
                name="last_name"
                placeholder="Last Name"
              />
            </div>
            <div className="field">
              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="field">
              <input
                className="input"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div className="field">
              <input
                className="input"
                type="text"
                name="country"
                placeholder="Country"
              />
            </div>
            <div className="field">
              <select className="select" name="skill_level">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <button type="submit" className="btn btn--primary">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
