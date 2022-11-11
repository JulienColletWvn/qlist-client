import { useState, useEffect, ChangeEvent, useMemo } from "react";
import styled from "styled-components";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { TextInput, Button } from "../../components/input";
import Heading from "../../components/heading";
import { RegisterApp } from "../../layouts/app";
import { CreateUserParams, useCreateUserMutation } from "../../services/user";
import { getInputErrors, ValidationOptions, FormInput } from "../../utils/form";
import { Check } from "../../components/icons";
import { useToast } from "../../components/toast";

export type InputName =
  | "username"
  | "email"
  | "firstname"
  | "lastname"
  | "phone"
  | "password";

const StyledSubmitContainer = styled.div`
  padding-top: 0.75rem;
`;

const StyledCheckContainer = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: 0.2s;
`;

export const loginInputs: FormInput<InputName>[] = [
  {
    id: "email",
    label: "forms.fields.email",
    validationRules: {
      isEmail: true,
      required: true,
    },
    transform: (nextValue) => nextValue.toLowerCase(),
  },
  {
    id: "password",
    label: "forms.fields.password",
    validationRules: {
      minLength: 8,
      required: true,
    },
    type: "password",
  },
];

const accountForm: FormInput<InputName>[] = [
  {
    id: "username",
    validationRules: {
      minLength: 3,
      required: true,
    },
  },
  ...loginInputs,
];

const detailsForm: FormInput<InputName>[] = [
  {
    id: "firstname",
    label: "forms.fields.firstname",
  },
  {
    id: "lastname",
    label: "forms.fields.lastname",
  },
  {
    id: "phone",
    label: "forms.fields.phone",
    type: "phone",
  },
];

type BackendError = {
  status: number;
  data: {
    FailedField: string;
    Tag: string;
  }[];
};

type Step = 1 | 2;

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [showErrors, setShowErrors] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [addNewPost, { isSuccess, error }] = useCreateUserMutation();
  const [formData, setFormData] = useState<Partial<Record<InputName, string>>>(
    {}
  );
  const [formsErrors, setFormsErrors] = useState<
    Partial<Record<InputName, string[]>>
  >(
    accountForm.reduce((acc, { validationRules, id }) => {
      return {
        ...acc,
        ...(validationRules?.required && {
          [id]: ["forms.errors.required"],
        }),
      };
    }, {})
  );

  const handleFormFieldsError = (error: FetchBaseQueryError) => {
    const fieldsMapping: Record<string, InputName> = {
      "User.Firstname": "firstname",
      "User.Lastname": "lastname",
      "User.Password": "password",
      "User.Username": "username",
      "User.Phone": "phone",
    };

    if (!Array.isArray(error.data)) return;

    (error as BackendError)?.data?.forEach((error) => {
      const field = fieldsMapping[error.FailedField];
      if (field) {
        setFormsErrors((prev) => ({
          ...prev,
          [field]: [error.Tag],
        }));
      }
      if (field && accountForm.some(({ id }) => field === id)) {
        setStep(1);
      }
    });

    if ((error as BackendError)?.data) setShowErrors(true);
  };

  const handleUserCreationError = (error: FetchBaseQueryError) => {
    if ((error.data as { code: number })?.code === 1001)
      return addToast({
        id: Date.now() + "duplicated",
        title: t("errors.emailAlreadyInUse"),
        type: "danger",
      });
  };

  useEffect(() => {
    if (error && "status" in error && error.status === 400)
      handleFormFieldsError(error);
    if (error && "status" in error && error.status === 422)
      handleUserCreationError(error);
  }, [error]);

  useEffect(() => {
    if (isSuccess) navigate("/events");
  }, [isSuccess]);

  const handleChange = ({
    e,
    key,
    validationOptions,
    transform,
  }: {
    e: ChangeEvent<HTMLInputElement>;
    key: InputName;
    validationOptions?: ValidationOptions;
    transform?(nextValue: string): string;
  }) => {
    const value = transform ? transform(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (validationOptions)
      setFormsErrors((prev) => ({
        ...prev,
        [key]: getInputErrors({
          value,
          ...validationOptions,
        }).map((e) => "forms.errors." + e),
      }));
  };

  const steps: Record<Step, JSX.Element> = {
    1: (
      <>
        <h3>{t("register.form.name.title")}</h3>
        <p>{t("register.form.name.description")}</p>
        {accountForm.map(({ id, label, validationRules, type, transform }) => (
          <TextInput
            key={id}
            id={id}
            label={label && t(label)}
            type={type}
            value={formData[id] ?? ""}
            onChange={(e) =>
              handleChange({
                e,
                key: id,
                validationOptions: validationRules,
                transform,
              })
            }
            errors={showErrors ? formsErrors[id]?.map((e) => t(e)) : []}
            suffix={
              <StyledCheckContainer
                visible={
                  formData[id] != null &&
                  validationRules != null &&
                  formsErrors[id]?.length == 0
                }
              >
                <Check />
              </StyledCheckContainer>
            }
          />
        ))}
        <StyledSubmitContainer>
          <Button
            onClick={() => {
              if (
                accountForm.some(
                  ({ id }) =>
                    formsErrors[id] && (formsErrors[id] as string[])?.length > 0
                )
              )
                return setShowErrors(true);
              setStep(2);
            }}
            label={t("next")}
          />
        </StyledSubmitContainer>
      </>
    ),
    2: (
      <>
        <h3>{t("register.form.details.title")}</h3>
        <p>{t("register.form.details.description")}</p>
        {detailsForm.map(({ id, label, validationRules, type, transform }) => (
          <TextInput
            key={id}
            id={id}
            label={label && t(label)}
            type={type}
            value={formData[id] ?? ""}
            onChange={(e) =>
              handleChange({
                e,
                key: id,
                validationOptions: validationRules,
                transform,
              })
            }
            errors={showErrors ? formsErrors[id]?.map((e) => t(e)) : []}
            suffix={
              <StyledCheckContainer
                visible={
                  formData[id] != null &&
                  validationRules != null &&
                  formsErrors[id]?.length == 0
                }
              >
                <Check />
              </StyledCheckContainer>
            }
          />
        ))}
        <StyledSubmitContainer>
          <Button
            onClick={() => setStep(1)}
            label={t("previous")}
            style="outline"
          />
          <Button
            onClick={() =>
              addNewPost(
                Object.entries(formData).reduce(
                  (acc, [key, value]) => ({ ...acc, [key]: value }),
                  {} as CreateUserParams
                )
              )
            }
            label={t("validate")}
          />
        </StyledSubmitContainer>
      </>
    ),
  };

  return (
    <RegisterApp>
      <Heading>{t("register.title")}</Heading>
      {steps[step]}
    </RegisterApp>
  );
};

export default Register;
