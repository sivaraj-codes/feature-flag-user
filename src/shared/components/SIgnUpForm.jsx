import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAuth } from "../../shared/context/AuthContext";
import { api } from "../../lib/axiosInstance";
import { usePublicOrganizations } from "../../queries/organizationQueries";
import styles from "./SIgnUpForm.module.css";
import { USER_ROLES } from "../constants";

const signupSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  organizationId: yup.string().required("Please select an organization"),
});

const initFormValues = {
  name: "",
  email: "",
  password: "",
  organizationId: "",
  roleId: USER_ROLES.EU,
};

const SignUpForm = ({ onSwitchToSignin }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { data: organizations = [], isPending: orgsLoading } =
    usePublicOrganizations();

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      await api.post("/auth/signup", values);
      onSwitchToSignin();
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err.message);
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

      <h1 className={styles.heading}>Create User Account</h1>
      <p className={styles.subheading}>
        View feature flags of your organization
      </p>

      <Formik
        initialValues={initFormValues}
        validationSchema={signupSchema}
        onSubmit={handleSignUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form aria-label="Sign up form">
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                className="input"
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                data-error={Boolean(touched?.name && errors?.name)}
                aria-label="Full Name"
              />
              <ErrorMessage name="name" component="div" className="errorMsg" />
            </div>

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
                placeholder="Min. 8 characters"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                data-error={Boolean(touched?.password && errors?.password)}
                aria-label="Password"
              />
              <p className={styles.hint}>
                Use a strong password with letters, numbers &amp; symbols
              </p>
              <ErrorMessage
                name="password"
                component="div"
                className="errorMsg"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="organizationId">Organization</label>
              <select
                className="input"
                id="organizationId"
                name="organizationId"
                value={values.organizationId}
                onChange={handleChange}
                onBlur={handleBlur}
                data-error={Boolean(
                  touched?.organizationId && errors?.organizationId,
                )}
                aria-label="Organization"
                disabled={orgsLoading}
              >
                <option value="">
                  {orgsLoading
                    ? "Loading organizations..."
                    : "Select organization"}
                </option>
                {organizations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}
              </select>
              <p className={styles.hint}>
                Select the organization you'll be administering
              </p>
              <ErrorMessage
                name="organizationId"
                component="div"
                className="errorMsg"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || orgsLoading}
              className="btn btn--primary btn--block"
              aria-label={isSubmitting ? "Creating account" : "Create Account"}
            >
              {isSubmitting ? "Creating account..." : "Create Account →"}
            </button>
          </Form>
        )}
      </Formik>

      <p className={styles.switchText}>
        Already have an account?{" "}
        <button
          type="button"
          className={styles.switchLink}
          onClick={onSwitchToSignin}
        >
          Sign in
        </button>
      </p>
    </section>
  );
};

export default SignUpForm;
