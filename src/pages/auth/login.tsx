import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { useLazyLoginQuery } from "../../services/auth";
import { TextInput, Button } from "../../components/input";
import Heading from "../../components/heading";
import { LoginApp } from "../../layouts/app";
import { getInputErrors, ValidationOptions } from "../../utils/form";
import { loginInputs, InputName } from "./register";
import { useToast } from "../../components/toast";

const StyledSubmitContainer = styled.div`
  padding-top: 0.75rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [showErrors, setShowErrors] = useState(false);
  const [trigger, { isSuccess, isError, isLoading }] = useLazyLoginQuery();
  const [formData, setFormData] = useState<Partial<Record<InputName, string>>>(
    {}
  );
  const [formsErrors, setFormsErrors] = useState<
    Partial<Record<InputName, string[]>>
  >(
    loginInputs.reduce((acc, { validationRules, id }) => {
      return {
        ...acc,
        ...(validationRules?.required && {
          [id]: ["forms.errors.required"],
        }),
      };
    }, {})
  );

  useEffect(() => {
    if (isSuccess) navigate("/events");
  }, [isSuccess]);

  useEffect(() => {
    if (isError)
      addToast({
        type: "danger",
        title: t("errors.invalidCredentials"),
        id: Date.now() + "loginerror",
      });
  }, [isError]);

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

  return (
    <LoginApp isLoading={isLoading}>
      <Heading>{t("login.title")}</Heading>
      {loginInputs.map(({ id, label, validationRules, type, transform }) => (
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
        />
      ))}
      <StyledSubmitContainer>
        <Button
          onClick={() =>
            Object.values(formsErrors).some((errors) => errors.length > 0)
              ? setShowErrors(true)
              : trigger({
                  email: String(formData.email),
                  password: String(formData.password),
                })
          }
          label={t("next")}
        />
      </StyledSubmitContainer>
    </LoginApp>
  );
};

export default Login;
