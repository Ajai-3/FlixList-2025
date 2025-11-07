import { AppError } from "./AppError";
import { HttpStatus } from "../../infrastructure/constants/HttpStatus";

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
