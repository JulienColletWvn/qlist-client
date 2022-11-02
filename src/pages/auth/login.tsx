import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, ChangeEvent } from "react";
import { useLazyLoginQuery } from "../../services/auth";
import { TextInput, Button } from "../../components/input";
import Heading from "../../components/heading";
import { LoginApp } from "../../layouts/app";
import { getInputErrors, ValidationOptions } from "../../utils/form";
import { loginInputs, InputName } from "./register";
import { useToast } from "../../components/toast";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addToast } = useToast();
  const [showErrors, setShowErrors] = useState(false);
  const [trigger, { isSuccess, isError }] = useLazyLoginQuery();
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: InputName,
    validationOptions?: ValidationOptions
  ) => {
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));
    if (validationOptions)
      setFormsErrors((prev) => ({
        ...prev,
        [key]: getInputErrors({
          value: e.target.value,
          ...validationOptions,
        }).map((e) => "forms.errors." + e),
      }));
  };

  return (
    <LoginApp>
      <Heading>{t("login.title")}</Heading>
      {loginInputs.map(({ id, label, validationRules, type }) => (
        <TextInput
          key={id}
          id={id}
          label={label && t(label)}
          type={type}
          value={formData[id] ?? ""}
          onChange={(e) => handleChange(e, id, validationRules)}
          errors={showErrors ? formsErrors[id]?.map((e) => t(e)) : []}
        />
      ))}
      <div>
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
      </div>
    </LoginApp>
  );
};

export default Login;
