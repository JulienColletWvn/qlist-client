export type Errors = "minLength" | "maxLength" | "invalidEmail" | "required";

export type ValidationOptions = {
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  required?: boolean;
};

export const getInputErrors = ({
  value,
  minLength,
  maxLength,
  isEmail,
  required,
}: {
  value: string;
} & ValidationOptions): Errors[] => {
  let errors: Errors[] = [];

  if (required && value.length === 0) errors.push("required");

  if (isEmail && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
    errors.push("invalidEmail");

  if (minLength && value.length < minLength) errors.push("minLength");
  if (maxLength && value.length > maxLength) errors.push("maxLength");

  return errors;
};
