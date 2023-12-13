export abstract class AbstractValidateResult {
  isValid?: boolean = true;

  messages?: string[] = [];
}

export class StudentValidateResult extends AbstractValidateResult {
  username: number = 0;
  email: number = 0;
}

export class RegistrationValidateResult extends AbstractValidateResult {
  username: number = 0;
  email: number = 0;
}
