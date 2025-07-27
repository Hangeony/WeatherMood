import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해야 합니다. ' })
    .email({ message: '올바른 이메일 형식이어야 합니다.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해야 합니다. ' }),
});

export type LoginDto = z.infer<typeof loginSchema>;
