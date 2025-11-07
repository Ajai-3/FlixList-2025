import { AppError } from "./AppError";
import { HttpStatus } from "../../infrastructure/constants/HttpStatus";

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}