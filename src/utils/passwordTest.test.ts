import { passwordGrade } from "./passwordGrade";

describe("passwordGrade", () => {
  it("пустой пароль — weak, score 0", () => {
    const result = passwordGrade("");
    expect(result.score).toBe(0);
    expect(result.level).toBe("weak");
  });

  it("только длинная строка — выполнен 1 критерий", () => {
    const result = passwordGrade("abcdefgh");
    expect(result.criteria.minLength).toBe(true);
    expect(result.criteria.numbers).toBe(false);
    expect(result.score).toBe(1);
  });

  it("средний пароль — middle", () => {
    const result = passwordGrade("Abcdefg1");
    expect(result.score).toBe(3);
    expect(result.level).toBe("middle");
  });

  it("сильный пароль — все критерии", () => {
    const result = passwordGrade("Abcdef1!");
    expect(result.score).toBe(4);
    expect(result.level).toBe("strong");
    expect(result.color).toBe("#22c55e");
  });

  it("pure function — одинаковый вход всегда даёт одинаковый выход", () => {
    expect(passwordGrade("Test1!")).toEqual(passwordGrade("Test1!"));
  });
});
