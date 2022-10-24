import { useState } from "react";
import { useRouter } from "next/router";
import { TextInput, Button } from "../../components/input";
import Heading from "../../components/heading";
import { RegisterApp } from "../../layouts/app";
import { CreateUserParams, useCreateUserMutation } from "@services/index";

const Register = () => {
  const router = useRouter();
  const [addNewPost, { isLoading }] = useCreateUserMutation();
  const [formData, setFormData] = useState<
    Record<string, { value: string; isValid: Boolean }>
  >({});

  return (
    <RegisterApp>
      <Heading>Créer un compte</Heading>
      {[
        { key: "username" },
        { key: "email" },
        { key: "firstname" },
        { key: "lastname" },
        { key: "phone" },
        { key: "password" },
      ].map(({ key }) => (
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
      <Button
        onClick={() =>
          addNewPost(
            Object.entries(formData).reduce(
              (acc, [key, { value }]) => ({ ...acc, [key]: value }),
              {} as CreateUserParams
            )
          )
        }
        label="Suivant"
      />
    </RegisterApp>
  );
};

export default Register;
