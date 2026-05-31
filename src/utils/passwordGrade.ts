interface PasswordCriteria {
  minLength: boolean;
  mixSymbols: boolean;
  numbers: boolean;
  specialSymbols: boolean;
}

type PasswordLevel = "weak" | "middle" | "strong";

interface PasswordResultGrade {
  score: number;
  criteria: PasswordCriteria;
  level: PasswordLevel;
  color: string;
}

export const passwordGrade = (password: string): PasswordResultGrade => {
  const criteria: PasswordCriteria = {
    minLength: password.length >= 4,
    specialSymbols: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
    numbers: /[0-9]/.test(password),
    mixSymbols: /[a-z]/.test(password) && /[A-Z]/.test(password),
  };

  const score = Object.values(criteria).filter(Boolean).length;

  const level: PasswordLevel =
    score <= 1 ? "weak" : score <= 3 ? "middle" : "strong";
  const color =
    level === "weak" ? "#ef4444" : level === "middle" ? "#f97316" : "#22c55e";
  return {
    score,
    criteria,
    level,
    color,
  };
};
