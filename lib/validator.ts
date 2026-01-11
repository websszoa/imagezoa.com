import { z } from "zod";

// 문의하기 폼 스키마
export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "이름을 입력해주세요")
    .regex(/^[가-힣]+$/, "이름은 한글로만 입력해주세요")
    .min(2, "이름은 2글자 이상 입력해주세요")
    .max(5, "이름은 5글자 이하로 입력해주세요"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  message: z.string().min(10, "문의 내용을 10자 이상 입력해주세요"),
});
