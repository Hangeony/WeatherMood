import { date, string, z } from 'zod';

export const createMemoSchema = z.object({
  memo: z.string().min(1, { message: '메모는 꼭 입력해야 합니다.' }),
  feelingId: z.number(),
  location: z.string(),
  date: z.string(),
});

export type CreateMemoDto = z.infer<typeof createMemoSchema>;

export const updateMemoSchema = z.object({
  memo: z.string().optional(),
  feelingId: z.number().optional(),
});

export type UpdateMemoDto = z.infer<typeof updateMemoSchema>;
