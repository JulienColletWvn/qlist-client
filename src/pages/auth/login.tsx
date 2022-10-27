import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useLazyLoginQuery } from "../../services/auth";
import { TextInput, Button } from "../../components/input";
import Heading from "../../components/heading";
import { LoginApp } from "../../layouts/app";

const Login = () => {
  const navigate = useNavigate();
  const [trigger, { isSuccess, isError }] = useLazyLoginQuery();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<
    Record<string, { value: string; isValid: Boolean }>
  >({});

  useEffect(() => {
    if (isSuccess) navigate("/events");
  }, [isSuccess]);

  const { onClick } = useMemo(() => {
    if (currentStep === 1) {
      const disabled = !formData.email?.isValid || !formData.password?.isValid;
      return {
        disabled,
        onClick: () => (disabled ? null : setCurrentStep((p) => p + 1)),
      };
    }
    return {
      disabled: true,
      onClick: () => null,
    };
  }, [formData, currentStep, setCurrentStep]);

  return (
    <LoginApp>
      <Heading>Se connecter</Heading>
      {[
        { key: "email", type: "text" },
        { key: "password", type: "password" },
      ].map(({ key, type }) => (
        <TextInput
          key={key}
          type={type}
          name={key}
          label={key}
          id={key}
          value={formData[key]?.value ?? ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [key]: { value: e.target.value, isValid: true },
            }))
          }
        ></TextInput>
      ))}
      <Button
        onClick={() =>
          trigger({
            email: formData.email.value,
            password: formData.password.value,
          })
        }
        label="Suivant"
      />
      {isError && <p>Something went wrong</p>}
    </LoginApp>
  );
};

export default Login;
