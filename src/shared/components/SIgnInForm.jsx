import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAuth } from "../../shared/context/AuthContext";
import { api } from "../../lib/axiosInstance";
import styles from "./SignInForm.module.css";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initFormValues = {
  email: "user@gmail.com",
  password: "user@2026",
};

const SignInForm = ({ onSwitchToSignup }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      let resp = await api.post("/auth/login", values);
      const userResp = await api.get("/auth/me");
      setUser(userResp.data.data?.user ?? null);
      toast.success("Welcome back!");
      navigate("/check-feature-flag", { replace: true });
    } catch (err) {
      toast.error(err.message);
      setTimeout(() => {
        setUser(null);
      }, 100);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.card}>
      {/* Brand */}
      <header className={styles.brand}>
        <span className={styles.brandIcon} aria-hidden="true">
          ⚑
        </span>
        <div>
          <p className={styles.brandName}>FlagForge</p>
          <p className={styles.brandRole}>User Portal</p>
        </div>
      </header>

      <h1 className={styles.heading}>Sign In</h1>
      {/* <p className={styles.subheading}>
        Access your organization's flag management
      </p> */}

      <Formik
        initialValues={initFormValues}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form aria-label="Login form">
            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                className="input"
                type="email"
                id="email"
                name="email"
                placeholder="user@company.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                data-error={Boolean(touched?.email && errors?.email)}
                aria-label="Email Address"
              />
              <ErrorMessage name="email" component="div" className="errorMsg" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                className="input"
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                data-error={Boolean(touched?.password && errors?.password)}
                aria-label="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="errorMsg"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn--primary btn--block"
              aria-label={isSubmitting ? "Signing in" : "Sign In"}
            >
              {isSubmitting ? "Signing in..." : "Sign In →"}
            </button>
          </Form>
        )}
      </Formik>

      <p className={styles.switchText}>
        Don't have an account?{" "}
        <button
          type="button"
          className={styles.switchLink}
          onClick={onSwitchToSignup}
        >
          Sign up
        </button>
      </p>
    </section>
  );
};

export default SignInForm;
