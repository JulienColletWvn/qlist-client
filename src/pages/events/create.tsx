import styled from "styled-components";
import { EventsListApp } from "../../layouts/app";
import { Col, Row } from "../../components/layout";
import { TextInput, Button, Select } from "../../components/input";
import { CreateUserParams, useCreateUserMutation } from "../../services/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/heading";

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventNameTranslations, setEventNameTranslations] = useState<
    Record<string, { value: string; valid: boolean }>
  >({
    fr: {
      value: "",
      valid: true,
    },
  });
  const [formData, setFormData] = useState<
    Record<string, { value: string; isValid: Boolean }>
  >({});

  return (
    <EventsListApp>
      <Heading>Create Event</Heading>
      <Row>
        <Col span={12}>
          <StyledInputContainer>
            {Object.entries(eventNameTranslations).map(([lang, { value }]) => (
              <>
                <TextInput
                  name="name"
                  value={value}
                  onChange={(nextValue) => {}}
                />
                <Select
                  value="fr"
                  options={[
                    { value: "fr", label: "fr" },
                    { value: "en", label: "en" },
                    { value: "nl", label: "nl" },
                  ]}
                  onChange={(nextLanguage) => {
                    const currentValue = { ...eventNameTranslations[lang] };
                    const values = { ...eventNameTranslations };
                    delete values[lang];
                    setEventNameTranslations({
                      ...values,
                      [nextLanguage]: currentValue,
                    });
                  }}
                />
              </>
            ))}
          </StyledInputContainer>
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
        </Col>
      </Row>
    </EventsListApp>
  );
};

export default CreateEvent;
