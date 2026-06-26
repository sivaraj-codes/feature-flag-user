import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { useCheckOrgFlag, useOrgFlags } from "../../queries/flagQueries";
import styles from "./CheckFeatureFlag.module.css";
import { useState } from "react";

const checkSchema = yup.object({
  flagKey: yup.string().required("Please select a feature key"),
});

const initValues = {
  flagKey: "",
};

export const CheckFeatureFlag = () => {
  const { data: orgFlags = [], isLoading } = useOrgFlags();
  const { mutateAsync: checkFlag, isPending } = useCheckOrgFlag();

  const [result, setResult] = useState(null);

  const handleCheck = async (values, { setSubmitting }) => {
    setResult(null);
    try {
      const data = await checkFlag(values.flagKey);
      setResult({ key: values.flagKey, enabled: data.enabled });
    } catch (err) {
      setResult({ key: values.flagKey, enabled: null, error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-content-wrapper page-card">
      <h1 className="page-title">Feature Flag Check</h1>
      <p className={styles.subheading}>
        Select a feature key to check whether it's enabled for your
        organization.
      </p>

      <Formik
        initialValues={initValues}
        validationSchema={checkSchema}
        onSubmit={handleCheck}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form className={styles.checkForm}>
            <div className={styles.formGroup}>
              <label htmlFor="flagKey">Feature Key</label>
              <select
                className="input"
                id="flagKey"
                name="flagKey"
                value={values.flagKey}
                onChange={(e) => {
                  handleChange(e);
                  setResult(null);
                }}
                onBlur={handleBlur}
                data-error={Boolean(touched.flagKey && errors.flagKey)}
                disabled={isLoading}
                aria-label="Feature Key"
              >
                <option value="">
                  {isLoading ? "Loading flags..." : "Select a feature key"}
                </option>
                {orgFlags.map((flag) => (
                  <option key={flag._id} value={flag.key}>
                    {flag.key}
                  </option>
                ))}
              </select>
              <ErrorMessage
                name="flagKey"
                component="div"
                className="errorMsg"
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? "Checking..." : "Check Status"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Result */}
      {result && (
        <div
          className={`${styles.result} ${
            result.error
              ? styles.resultError
              : result.enabled
                ? styles.resultEnabled
                : styles.resultDisabled
          }`}
          role="status"
          aria-live="polite"
        >
          {result.error ? (
            <p>⚠ {result.error}</p>
          ) : (
            <>
              <span className={styles.resultIcon}>
                {result.enabled ? "✓" : "✕"}
              </span>
              <div>
                <p className={styles.resultKey}>{result.key}</p>
                <p className={styles.resultLabel}>
                  {result.enabled
                    ? "This feature is enabled for your organization."
                    : "This feature is disabled for your organization."}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
