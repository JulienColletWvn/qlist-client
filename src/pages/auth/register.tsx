import { useState, useEffect } from "react";
import styled from "styled-components";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  Button,
  TextInputIconContainer,
} from "../../components/input";
import Heading from "../../components/heading";
import { RegisterApp } from "../../layouts/app";
import { CreateUserParams, useCreateUserMutation } from "../../services/user";
import { FormInput } from "../../utils/form";
import { Check } from "../../components/icons";
import { useToast } from "../../components/toast";
import { useForm } from "../../components/form/useForm";

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
    validationRules: {
      required: true,
    },
  },
  {
    id: "lastname",
    label: "forms.fields.lastname",
    validationRules: {
      required: true,
    },
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
  const {
    getValue,
    handleChange,
    addErrors,
    getErrors,
    formData,
    showErrors,
    setShowErrors,
    hasErrors,
    hasErrorsFor,
  } = useForm<InputName>({
    inputs: [...loginInputs, ...accountForm, ...detailsForm],
  });

  const [step, setStep] = useState<Step>(1);
  const [addNewPost, { isSuccess, error }] = useCreateUserMutation();

  const handleFormFieldsError = (error: FetchBaseQueryError) => {
    const backendErrors: Partial<Record<InputName, string[]>> = {};
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
      backendErrors[field] = [error.Tag];
    });

    addErrors(backendErrors);

    if (
      Object.keys(backendErrors).some((backendErrorKey) =>
        accountForm.some(({ id }) => backendErrorKey === id)
      )
    ) {
      setStep(1);
    }

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
    if (error)
      addToast({
        id: Date.now() + "error",
        title: t("errors.unknown"),
        type: "danger",
      });
  }, [error]);

  useEffect(() => {
    if (isSuccess) navigate("/events");
  }, [isSuccess]);

  const steps: Record<Step, JSX.Element> = {
    1: (
      <>
        <Heading level={3}>{t("register.form.name.title")}</Heading>
        <p>{t("register.form.name.description")}</p>
        {accountForm.map((input) => {
          const { id, label } = input;
          const value = getValue(id);
          const errors = getErrors(id);
          return (
            <TextInput
              id={label}
              label={label && t(label)}
              key={label}
              value={value}
              onChange={(e) => handleChange({ e, ...input })}
              errors={errors}
              showErrors={showErrors}
              type={input.type}
              suffix={
                <TextInputIconContainer
                  visible={value != null && errors?.length < 1}
                >
                  <Check />
                </TextInputIconContainer>
              }
            />
          );
        })}
        <StyledSubmitContainer>
          <Button
            onClick={() => {
              if (hasErrorsFor(["username", "email", "password"]))
                return setShowErrors();
              setShowErrors(false);
              setStep(2);
            }}
            label={t("next")}
          />
        </StyledSubmitContainer>
      </>
    ),
    2: (
      <>
        <Heading level={3}>{t("register.form.details.title")}</Heading>
        <p>{t("register.form.details.description")}</p>
        {detailsForm.map((input) => {
          const { id, label } = input;
          const value = getValue(id);
          const errors = getErrors(id);
          return (
            <TextInput
              id={label}
              label={label && t(label)}
              key={label}
              value={value}
              onChange={(e) => handleChange({ e, ...input })}
              errors={errors}
              showErrors={showErrors}
              type={input.type}
              suffix={
                <TextInputIconContainer
                  visible={value != null && errors?.length < 1}
                >
                  <Check />
                </TextInputIconContainer>
              }
            />
          );
        })}
        <StyledSubmitContainer>
          <Button
            onClick={() => setStep(1)}
            label={t("previous")}
            style="outline"
          />
          <Button
            onClick={() => {
              if (hasErrors) return setShowErrors();
              addNewPost(
                Object.entries(formData).reduce(
                  (acc, [key, value]) => ({ ...acc, [key]: value }),
                  {} as CreateUserParams
                )
              );
            }}
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
