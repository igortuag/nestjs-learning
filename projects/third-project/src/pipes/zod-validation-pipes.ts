import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from "@nestjs/common";
import { ZodError, ZodObject } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: error.message,
          errors: fromZodError(error),
          statusCode: 400
        });
      }

      throw new BadRequestException("Validation failed");
    }
  }
}
