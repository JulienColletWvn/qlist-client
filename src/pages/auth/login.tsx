import { useState, useMemo } from "react";
import { TextInput, Button } from "../../components/input";
import Heading from "../../components/heading";
import { LoginApp } from "../../layouts/app";

const Login = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<
    Record<string, { value: string; isValid: Boolean }>
  >({});

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
      {[{ key: "email" }, { key: "password" }].map(({ key }) => (
        <TextInput
          key={key}
          name={key}
          value={formData[key]?.value ?? ""}
          setValue={(nextValue) =>
            setFormData((prev) => ({
              ...prev,
              [key]: { value: nextValue, isValid: true },
            }))
          }
        />
      ))}
      <Button onClick={onClick} label="Suivant" />
    </LoginApp>
  );
};

export default Login;
