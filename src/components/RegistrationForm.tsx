import { useState, type ChangeEvent, type SubmitEvent } from "react";
import {
  validateRegister,
  type RegisterErrors,
  type RegisterFields,
} from "../utils/validate";
import { useRegisterMutation } from "../hooks/useRegisterMutation";
import PasswordGradeBar from "./PasswordGradeBar";
import PasswordInput from "./PasswordInput";

const RegistrationForm = () => {
  const [fields, setFields] = useState<RegisterFields>({
    email: "",
    password: "",
    name: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const { mutate, isPending, error } = useRegisterMutation();

  const handleOnChange =
    (key: keyof RegisterFields) => (e: ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateRegister(fields);
    if (Object.keys(validation).length) return setErrors(validation);
    mutate({ email: fields.email, password: fields.password });
  };

  return (
    <form
      style={{
        border: "1px solid gray",
        padding: "10px",
        margin: "55px",
        borderRadius: "15px",
      }}
      onSubmit={handleSubmit}
    >
      <h2>Registration</h2>
      <div>
        <input
          value={fields.name}
          onChange={handleOnChange("name")}
          placeholder="name"
          style={{
            border: errors.name ? "1px solid red" : "1px solid gray",
            padding: "10px",
            margin: "5px",
            borderRadius: "15px",
          }}
        />
        {errors.name && (
          <p style={{ color: "red", fontSize: 12 }}>{errors.name}</p>
        )}
      </div>
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
        <PasswordGradeBar password={fields.password} />
        {errors.password && (
          <p style={{ color: "red", fontSize: 12 }}>{errors.password}</p>
        )}
      </div>
      <div>
        <PasswordInput
          value={fields.confirm}
          onChange={handleOnChange("confirm")}
          placeholder="confirm password"
          error={!!errors.confirm}
        />
        {errors.confirm && (
          <p style={{ color: "red", fontSize: 12 }}>{errors.confirm}</p>
        )}
      </div>
      <button
        style={{
          border: "1px solid gray",
          padding: "10px",
          margin: "5px",
          borderRadius: "15px",
        }}
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Регистрация..." : "Зарегистрироваться"}
      </button>
      {error && <p style={{ color: "red", fontSize: 12 }}>{error.message}</p>}
    </form>
  );
};

export default RegistrationForm;
