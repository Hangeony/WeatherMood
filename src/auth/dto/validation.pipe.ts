import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    console.log('📦 Received in Zod Pipe:', value);
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const formattedErrors = result.error.issues.reduce(
        (acc, issue) => {
          const key = String(issue.path[0]);
          acc[key] = issue.message;
          return acc;
        },
        {} as Record<string, string>
      );

      throw new BadRequestException({ errors: formattedErrors });
    }

    return result.data;
  }
}
