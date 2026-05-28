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
  if (fields.name.length < 4) errors.name = "Минимум 4 символа";
  if (!email_val.test(fields.email)) errors.email = "Введите корректный email";
  if (fields.password.length < 6) errors.password = "Минимум 6 символов";
  if (!fields.confirm.includes(fields.password))
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
  if (fields.password.length < 6) errors.password = "Минимум 6 символов";
  if (!email_val.test(fields.email)) errors.email = "Введите корректный email";
  return errors;
};
