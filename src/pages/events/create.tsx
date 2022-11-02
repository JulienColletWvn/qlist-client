import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { EventsListApp } from "../../layouts/app";
import { Col, Row } from "../../components/layout";
import {
  TextInput,
  Checkbox,
  TextArea,
  RangePicker,
} from "../../components/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/heading";
import { Lang } from "../../types";

const StyledTranslatedContentContainer = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.sweetGrey};
  border-radius: 4px;
  margin-bottom: 0.75rem;
`;

const CreateEvent = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const [langs, setLangs] = useState<Lang[]>([language as Lang]);
  const [eventNameTranslations, setEventNameTranslations] = useState<
    Record<
      Lang,
      Record<"name" | "description", { value: string; valid: boolean }>
    >
  >({
    fr: {
      name: {
        valid: false,
        value: "",
      },
      description: {
        valid: false,
        value: "",
      },
    },
    nl: {
      name: {
        valid: false,
        value: "",
      },
      description: {
        valid: false,
        value: "",
      },
    },
    en: {
      name: {
        valid: false,
        value: "",
      },
      description: {
        valid: false,
        value: "",
      },
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
          <h3>Langues supportées</h3>
          <div>
            <Checkbox.Group
              options={[
                {
                  label: "Français",
                  value: "fr",
                },
                {
                  label: "English",
                  value: "en",
                },
                {
                  label: "Nederlands",
                  value: "nl",
                },
              ]}
              defaultValue={[language]}
              onChange={(nextValue) => setLangs(nextValue as Lang[])}
            />
          </div>
          {langs.map((lang) => (
            <StyledTranslatedContentContainer>
              <h3>{lang}</h3>
              <TextInput
                label="name"
                value={eventNameTranslations[lang]?.name?.value ?? ""}
                onChange={(e) =>
                  setEventNameTranslations((prev) => ({
                    ...prev,
                    [lang]: {
                      ...prev[lang],
                      name: {
                        value: e.target.value,
                        valid: true,
                      },
                    },
                  }))
                }
              />
              <TextArea
                label="description"
                value={eventNameTranslations[lang]?.description?.value ?? ""}
                onChange={(e) =>
                  setEventNameTranslations((prev) => ({
                    ...prev,
                    [lang]: {
                      ...prev[lang],
                      description: {
                        value: e.target.value,
                        valid: true,
                      },
                    },
                  }))
                }
              />
            </StyledTranslatedContentContainer>
          ))}
          <div>
            <h3>Dates de l'événement</h3>
            <RangePicker onChange={console.log} />
          </div>
          <TextInput
            name="Location"
            id="location"
            label="Location"
            value={formData.location?.value ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: { value: e.target.value, isValid: true },
              }))
            }
          />
          <Checkbox value="wifi" onChange={console.log}>
            Free wifi
          </Checkbox>
          <Checkbox value="public" onChange={console.log}>
            Public
          </Checkbox>
        </Col>
      </Row>
    </EventsListApp>
  );
};

export default CreateEvent;

/**
 * 
 * 	Content       []LocalisedTextContent `json:"name" gorm:"polymorphic:Content" validate:"required"`
	StartDate     *time.Time             `json:"start_date" gorm:"not null" validate:"required"`
	EndDate       *time.Time             `json:"end_date" gorm:"not null" validate:"required"`
	Location      string                 `json:"location" gorm:"not null" validate:"required"`
	FreeWifi      bool                   `json:"free_wifi"`
	Public        bool                   `json:"public" gorm:"not null"`
	TicketsAmount int                    `json:"tickets_amount"`
	Status        string                 `json:"status"`
 * 
 * 
 * 
 */
