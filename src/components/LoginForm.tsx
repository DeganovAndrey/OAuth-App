import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { loginUser } from "../api/api";
import { useAuth } from "../context/useAuth";
import {
  validateLogin,
  type LoginErrors,
  type LoginFields,
} from "../utils/validate";

const LoginForm = () => {
  const [fields, setFields] = useState<LoginFields>({
    email: "",
    password: "",
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginErrors>({});

  const { login } = useAuth();

  const handleOnChange =
    (key: keyof LoginFields) => (e: ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateLogin(fields);

    if (Object.keys(validation).length) return setErrors(validation);

    setIsPending(true);

    try {
      const data = await loginUser(fields);
      login(data.token, { email: fields.email });
    } catch (err) {
      setErrors({ server: (err as Error).message });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "55px",
        borderRadius: "15px",
      }}
    >
      <h2>login</h2>
      <div>
        <input
          value={fields.email}
          onChange={handleOnChange("email")}
          placeholder="email"
          style={{
            border: errors.email ? "1px solid red" : "1px solid gray",
            padding: "10px",
            margin: "5px",
            borderRadius: "15px",
          }}
        />
        {errors.email && (
          <p style={{ color: "red", fontSize: 12 }}>{errors.email}</p>
        )}
      </div>
      <div>
        <input
          value={fields.password}
          onChange={handleOnChange("password")}
          placeholder="password"
          type="password"
          style={{
            border: errors.password ? "1px solid red" : "1px solid gray",
            padding: "10px",
            margin: "5px",
            borderRadius: "15px",
          }}
        />
        {errors.password && (
          <p style={{ color: "red", fontSize: 12 }}>{errors.password}</p>
        )}
      </div>
      <button
        disabled={isPending}
        style={{
          border: "1px solid gray",
          padding: "10px",
          margin: "5px",
          borderRadius: "15px",
        }}
        type="submit"
      >
        {isPending ? "Вход..." : "Войти"}
      </button>
      {errors.server && (
        <p style={{ color: "red", fontSize: 12 }}>{errors.server}</p>
      )}
    </form>
  );
};

export default LoginForm;
