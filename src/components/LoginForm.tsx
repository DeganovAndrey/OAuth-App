import { useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  validateLogin,
  type LoginErrors,
  type LoginFields,
} from "../utils/validate";
import { useLoginMutation } from "../hooks/useLoginMutation";
import PasswordInput from "./PasswordInput";

const LoginForm = () => {
  const [fields, setFields] = useState<LoginFields>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const { mutate, isPending, error } = useLoginMutation();

  const handleOnChange =
    (key: keyof LoginFields) => (e: ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = validateLogin(fields);

    if (Object.keys(validation).length) return setErrors(validation);

    mutate(fields);
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
        <PasswordInput
          value={fields.password}
          onChange={handleOnChange("password")}
          placeholder="password"
          error={!!errors.password}
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
      {error && <p style={{ color: "red", fontSize: 12 }}>{error.message}</p>}
    </form>
  );
};

export default LoginForm;
