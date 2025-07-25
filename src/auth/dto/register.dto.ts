import { z } from 'zod';

export const registerSchema = z
  .object({
    nickName: z.string().min(1, { message: '닉네임을 입력해야 합니다.' }),
    email: z
      .string()
      .min(1, { message: '이메일을 입력해야 합니다.' })
      .email({ message: '올바른 이메일 형식이어야 합니다.' }),
    password: z
      .string()
      .min(1, { message: '비밀번호는 1자 이상이여야 합니다.' }),
    confirm_password: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해야 합니다.' }),
    cityName: z.string().min(1, { message: '도시명을 입력해야 합니다.' }),
  })
  .refine(data => data.password === data.confirm_password, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirm_password'],
  });

export type RegisterDto = z.infer<typeof registerSchema>;
