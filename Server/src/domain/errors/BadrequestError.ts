import { AppError } from "./AppError";
import { HttpStatus } from "../../infrastructure/constants/HttpStatus";

export class BadrequestError extends AppError {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
