export interface RegisterFields {
  email: string;
  password: string;
  name: string;
  confirm: string;
}

export type RegisterErrors = Partial<RegisterFields & { server: string }>;

const email_val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegister = (fields: RegisterFields) => {
  const errors: RegisterErrors = {};
  if (!fields.name.trim()) errors.name = "Введите имя";
  else if (fields.name.trim().length < 4) errors.name = "Минимум 4 символа";

  if (!fields.email.trim()) errors.email = "Введите email";
  else if (!email_val.test(fields.email))
    errors.email = "Введите корректный email";

  if (!fields.password.trim()) errors.password = "Введите password";
  else if (fields.password.length < 4) errors.password = "Минимум 4 символов";

  if (!fields.confirm) errors.confirm = "Повторите пароль";
  else if (fields.confirm !== fields.password)
    errors.confirm = "Пароли не совпадают";
  return errors;
};
export interface LoginFields {
  email: string;
  password: string;
}

export type LoginErrors = Partial<LoginFields & { server: string }>;

export const validateLogin = (fields: LoginFields) => {
  const errors: LoginErrors = {};
  if (fields.password.length < 4) errors.password = "Минимум 4 символа";
  if (!email_val.test(fields.email)) errors.email = "Введите корректный email";
  return errors;
};
