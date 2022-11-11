export type Errors =
  | "minLength"
  | "maxLength"
  | "invalidEmail"
  | "invalidPhoneNumber"
  | "required";

export type FormInput<T> = {
  id: T;
  label?: string;
  type?: string;
  validationRules?: ValidationOptions;
  transform?(nextValue: string): string;
};

export type ValidationOptions = {
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  isPhoneNumber?: boolean;
  required?: boolean;
};

export const getInputErrors = ({
  value,
  minLength,
  maxLength,
  isEmail,
  isPhoneNumber,
  required,
}: {
  value: string;
} & ValidationOptions): Errors[] => {
  let errors: Errors[] = [];

  if (required && value.length === 0) errors.push("required");

  if (
    isPhoneNumber &&
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(value)
  )
    errors.push("invalidPhoneNumber");

  if (isEmail && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
    errors.push("invalidEmail");

  if (minLength && value.length < minLength) errors.push("minLength");
  if (maxLength && value.length > maxLength) errors.push("maxLength");

  return errors;
};
