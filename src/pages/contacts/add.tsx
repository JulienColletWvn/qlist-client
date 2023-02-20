import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row } from "../../components/layout";
import {
  TextInput,
  Button,
  TextInputIconContainer,
} from "../../components/input";
import { ContactsApp } from "../../layouts/app/contacts";
import Heading from "../../components/heading";
import { FormInput } from "../../utils/form";
import { Check } from "../../components/icons";
import { useForm } from "../../components/form/useForm";
import { useCreateContacts, Contact } from "../../services";

const StyledSubmitContainer = styled.div`
  padding-top: 0.75rem;
`;

type InputName = keyof Contact;

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
  const { mutate, isSuccess } = useCreateContacts();

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
      <h3>{t("contacts.create.single.title")}</h3>
      <p>{t("contacts.create.single.description")}</p>
      <Row gutter={24}>
        <Col span={8}>
          {inputs.slice(0, 2).map((input) => {
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
                  <TextInputIconContainer
                    visible={value != null && errors?.length < 1}
                  >
                    <Check />
                  </TextInputIconContainer>
                }
              />
            );
          })}
        </Col>
        <Col span={8}>
          {inputs.slice(2, 4).map((input) => {
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
                  <TextInputIconContainer
                    visible={value != null && errors?.length < 1}
                  >
                    <Check />
                  </TextInputIconContainer>
                }
              />
            );
          })}
        </Col>
      </Row>
      <Row>
        <StyledSubmitContainer>
          <Button
            label={t("contacts.create.submit")}
            onClick={() => {
              if (hasErrors) return setShowErrors();
              mutate([{ ...formData, lang: "en" }]);
            }}
          />
        </StyledSubmitContainer>
      </Row>
    </ContactsApp>
  );
};

export default AddContact;
