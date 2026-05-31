import { passwordGrade } from "../utils/passwordGrade";

interface PasswordGradeBarProps {
  password: string;
}

const PasswordGradeBar = ({ password }: PasswordGradeBarProps) => {
  if (!password) return null;

  const { score, level, color, criteria } = passwordGrade(password);

  const labels = { weak: "Слабый", middle: "Средний", strong: "Сильный" };

  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 2,
              backgroundColor: i <= score ? color : "#e5e7eb",
              transition: "background-color 0.2s",
            }}
          />
        ))}
      </div>

      <p style={{ color, fontSize: 12, marginTop: 4 }}>{labels[level]}</p>

      <ul
        style={{
          fontSize: 11,
          color: "#6b7280",
          marginTop: 4,
          paddingLeft: 16,
        }}
      >
        <li style={{ color: criteria.minLength ? "#22c55e" : undefined }}>
          Минимум 4 символа
        </li>
        <li style={{ color: criteria.mixSymbols ? "#22c55e" : undefined }}>
          Заглавные и строчные буквы
        </li>
        <li style={{ color: criteria.numbers ? "#22c55e" : undefined }}>
          Цифры
        </li>
        <li style={{ color: criteria.specialSymbols ? "#22c55e" : undefined }}>
          Спецсимволы (!@#$...)
        </li>
      </ul>
    </div>
  );
};

export default PasswordGradeBar;
