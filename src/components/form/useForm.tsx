import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormInput, getInputErrors } from "../../utils/form";

export function useForm<T extends string>({
  inputs,
}: {
  inputs: FormInput<T>[];
}) {
  const { t } = useTranslation();
  const [showErrors, setShowErrors] = useState(false);
  const [formData, setFormData] = useState<Partial<Record<T, string>>>({});
  const [formsErrors, setFormsErrors] = useState<Partial<Record<T, string[]>>>(
    inputs.reduce((acc, { validationRules, id }) => {
      return {
        ...acc,
        ...(validationRules?.required && {
          [id]: ["forms.errors.required"],
        }),
      };
    }, {})
  );

  const handleChange = ({
    e,
    id,
    validationRules,
    transform,
  }: {
    e: ChangeEvent<HTMLInputElement>;
  } & FormInput<T>) => {
    const value = transform ? transform(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (validationRules)
      setFormsErrors((prev) => ({
        ...prev,
        [id]: getInputErrors({
          value,
          ...validationRules,
        }).map((e) => "forms.errors." + e),
      }));
  };

  return {
    showErrors,
    setShowErrors: () => setShowErrors(true),
    handleChange,
    getValue: (key: T) => formData[key],
    getErrors: (key: T): string[] => {
      if (formsErrors[key] && Array.isArray(formsErrors[key]))
        return (formsErrors[key] as string[]).map((e) => t(e));
      return [];
    },
    formData,
    hasErrors: Object.values(formsErrors).some(
      (errors) => Array.isArray(errors) && errors.length > 0
    ),
  };
}
