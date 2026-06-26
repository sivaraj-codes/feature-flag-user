import { useState } from "react";
import SignInForm from "../../shared/components/SIgnInForm";
import SignUpForm from "../../shared/components/SIgnUpForm";

export const AuthPage = () => {
  const [mode, setMode] = useState("signin");

  return (
    <main className="route-wrapper" aria-label="User Auth">
      {mode === "signin" ? (
        <SignInForm onSwitchToSignup={() => setMode("signup")} />
      ) : (
        <SignUpForm onSwitchToSignin={() => setMode("signin")} />
      )}
    </main>
  );
};
