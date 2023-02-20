import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import styled from "styled-components";
import {
  TextInput,
  Button,
  TextInputIconContainer,
} from "../../components/input";
import Heading from "../../components/heading";
import { LoginApp } from "../../layouts/app";
import { loginInputs, InputName } from "./register";
import { useToast } from "../../components/toast";
import { useForm } from "../../components/form/useForm";
import { Check } from "../../components/icons";
import { useLogin } from "../../services/auth";

const StyledSubmitContainer = styled.div`
  padding-top: 0.75rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const { mutate, isSuccess, isError, isLoading } = useLogin();

  const {
    getValue,
    handleChange,
    getErrors,
    formData,
    showErrors,
    setShowErrors,
    hasErrors,
  } = useForm<InputName>({ inputs: loginInputs });

  useEffect(() => {
    if (isSuccess) navigate("/contacts");
  }, [isSuccess]);

  useEffect(() => {
    if (isError)
      addToast({
        type: "danger",
        title: t("errors.invalidCredentials"),
        id: Date.now() + "loginerror",
      });
  }, [isError]);

  return (
    <LoginApp isLoading={isLoading}>
      <Heading>{t("login.title")}</Heading>
      {loginInputs.map((input) => {
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
          onClick={() =>
            hasErrors
              ? setShowErrors()
              : mutate({
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
