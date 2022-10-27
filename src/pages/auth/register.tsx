import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextInput, Button } from "../../components/input";
import Heading from "../../components/heading";
import { RegisterApp } from "../../layouts/app";
import { CreateUserParams, useCreateUserMutation } from "../../services/user";

const Register = () => {
  const navigate = useNavigate();
  const [addNewPost, { isSuccess, isError }] = useCreateUserMutation();
  const [formData, setFormData] = useState<
    Record<string, { value: string; isValid: Boolean }>
  >({});

  useEffect(() => {
    if (isSuccess) navigate("/events");
  }, [isSuccess]);

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
          id={key}
          label={key}
          value={formData[key]?.value ?? ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              [key]: { value: e.target.value, isValid: true },
            }))
          }
        />
      ))}
      <div>
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
      </div>
      {isError && <p>Something went wrong</p>}
    </RegisterApp>
  );
};

export default Register;
