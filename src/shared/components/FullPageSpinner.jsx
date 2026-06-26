const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export function FullPageSpinner() {
  return (
    <div style={styles.wrapper} aria-label="loading">
      <div className="spinner" />
    </div>
  );
}
