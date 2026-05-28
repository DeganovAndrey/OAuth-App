import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("register");
  return (
    <div>
      <div>
        <button onClick={() => setMode("login")} disabled={mode === "login"}>
          Вход
        </button>
        <button
          onClick={() => setMode("register")}
          disabled={mode === "register"}
        >
          Регистрация
        </button>
        {mode === "login" ? <LoginForm /> : <RegistrationForm />}
      </div>
    </div>
  );
};

export default AuthForm;
