import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row } from "../../components/layout";
import { TextInput, Button } from "../../components/input";
import { ContactsApp } from "../../layouts/app/contacts";
import Heading from "../../components/heading";
import { FormInput } from "../../utils/form";
import { Contact, useCreateContactMutation } from "../../services";
import { Check } from "../../components/icons";
import { useForm } from "../../components/form/useForm";

const StyledCheckContainer = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: center;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: 0.2s;
`;

const StyledSubmitContainer = styled.div`
  padding-top: 0.75rem;
`;

type InputName = "email" | "firstname" | "lastname" | "phone";

export const inputs: FormInput<InputName>[] = [
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
    id: "email",
    label: "forms.fields.email",
    validationRules: {
      isEmail: true,
      required: true,
    },
    transform: (nextValue) => nextValue.toLowerCase(),
  },
  {
    id: "phone",
    label: "forms.fields.phone",
    validationRules: {
      required: true,
      isPhoneNumber: true,
    },
  },
];

const AddContact = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [addContact, { isLoading, isSuccess, isError }] =
    useCreateContactMutation();
  const {
    getValue,
    handleChange,
    getErrors,
    formData,
    showErrors,
    setShowErrors,
    hasErrors,
  } = useForm<InputName>({ inputs });

  useEffect(() => {
    if (isSuccess) navigate("/contacts");
  }, [isSuccess]);

  return (
    <ContactsApp>
      <Heading>{t("contacts.list.title")}</Heading>
      <Row gutter={24}>
        <Col span={12}>
          {inputs.map((input) => {
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
                suffix={
                  <StyledCheckContainer
                    visible={value != null && errors?.length < 1}
                  >
                    <Check />
                  </StyledCheckContainer>
                }
              />
            );
          })}
          <StyledSubmitContainer>
            <Button
              label={t("contacts.create.submit")}
              onClick={() => {
                if (hasErrors) return setShowErrors();
                addContact(formData as Contact);
              }}
            />
          </StyledSubmitContainer>
        </Col>
      </Row>
    </ContactsApp>
  );
};

export default AddContact;
