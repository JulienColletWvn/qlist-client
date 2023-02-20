import { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { EventsListApp } from "../../layouts/app";
import { Col, Row } from "../../components/layout";
import {
  TextInput,
  Switch,
  TextArea,
  RangePicker,
  Button,
} from "../../components/input";
import { useNavigate } from "react-router-dom";
import Heading from "../../components/heading";
import { Tip } from "../../components/tip";
import { Lang } from "../../types";
import { getInputErrors, ValidationOptions } from "../../utils/form";
import { useToast } from "../../components/toast";
import { useCreateEvent, EventContent } from "../../services";

const StyledError = styled.span`
  font-size: 12px;
  color: red;
`;

const StyledLanguageBadge = styled.li<{
  selected?: boolean;
  disabled?: boolean;
}>`
  display: inline-block;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  font-size: 12px;
  padding: 0.25rem 0.5rem 0.1rem 0.5rem;
  border-radius: 4px 4px 0px 0px;
  border: 1px solid ${({ theme }) => theme.accent};
  margin-right: 0.25rem;
  cursor: pointer;
  user-select: none;

  ${({ selected, theme }) =>
    selected
      ? `
        border: 1px solid ${theme.colors.cardBorder};
        background-color: white;
        color: ${theme.colors.pureGrey};
        border-bottom-color: white;
      `
      : ""}

  ${({ disabled, selected, theme }) =>
    disabled && !selected
      ? `
          border: 1px solid ${theme.colors.cardBorder};
          background-color: white;
          color: ${theme.colors.sweetGrey};
          `
      : ""}

      border-bottom-color: transparent;
`;

const StyledLanguageBadgeContainer = styled.ul`
  padding: 0;
  margin: 0;
`;

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;

const StyledLanguageContent = styled.div`
  padding: 1rem;
  border-radius: 0px 4px 4px 4px;
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

const StyledLanguageContainer = styled.div`
  margin-bottom: 1rem;
`;

const CreateEvent = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [currentLang, setCurrentLang] = useState<Lang>(language as Lang);
  const [formData, setFormData] = useState<
    Record<string, string | number | boolean>
  >({});
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({
    capacity: ["forms.errors.required"],
    startDate: ["forms.errors.required"],
    location: getInputErrors({ value: "", required: true })?.map(
      (e) => "forms.errors." + e
    ),
  });
  const [showErrors, setShowErrors] = useState(false);
  const { mutate, isSuccess, error, isLoading } = useCreateEvent();

  useEffect(() => {
    if (error)
      addToast({
        id: Date.now() + "creation error",
        title: t("errors.unknown"),
        type: "danger",
      });
    if (isSuccess) navigate("/events");
  }, [isSuccess, error]);

  const handleContentErrors = (): boolean => {
    const incompleteContentErrors = ["nl", "fr", "en"]
      .map((lang) => {
        if (!formData[lang + "-name"] && !formData[lang + "-description"])
          return null;
        if (!formData[lang + "-name"] || !formData[lang + "-description"])
          return t("events.create.fields.contents.errors.incompleteLanguage", {
            lang: t(`languages.${lang}`),
          });
      })
      .filter(Boolean);

    const missingContent = !["nl", "fr", "en"]
      .map(
        (lang) => formData[lang + "-name"] && formData[lang + "-description"]
      )
      .some((c) => c);

    setFormErrors((prev) => ({
      ...prev,
      content:
        incompleteContentErrors.length > 0
          ? (incompleteContentErrors as string[])
          : [],
      ...(missingContent && {
        content: [t("events.create.fields.contents.errors.missingContent")],
      }),
    }));

    if (missingContent) return true;
    if (incompleteContentErrors.length > 0) return true;
    return false;
  };

  const handleSubmit = () => {
    const hasContentError = handleContentErrors();
    if (
      hasContentError ||
      Object.values(formErrors).some((errors) => errors.length > 0)
    )
      return setShowErrors(true);

    const content = ["nl", "fr", "en"].map((lang) =>
      ["name", "description"]
        .map((type) => {
          const content = formData[`${lang}-${type}`];
          if (!content) return null;
          return {
            lang,
            content,
            type,
          };
        })
        .filter(Boolean)
    );

    mutate({
      contents: content.flat() as EventContent[],
      start_date: formData.startDate as string,
      end_date: formData.endDate as string,
      location: formData.location as string,
      tickets_amount: formData.capacity as number,
      free_wifi: formData.wifi === true,
      public: formData.public === true,
      status: "DRAFT",
    });
  };

  const handleChange = (
    value: string | number | boolean,
    key: string,
    validationOptions?: ValidationOptions
  ) => {
    handleContentErrors();
    if (typeof value === "string" && validationOptions) {
      const errors = getInputErrors({ value, ...validationOptions });
      setFormErrors((prev) => ({
        ...prev,
        [key]: errors.length > 0 ? errors.map((e) => "forms.errors." + e) : [],
      }));
    }
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <EventsListApp isLoading={isLoading}>
      <Heading>{t("events.create.title")}</Heading>
      <StyledRow gutter={24}>
        <Col span={16}>
          <h3>{t("events.create.fields.contents.title")}</h3>
          <StyledLanguageBadgeContainer>
            {["fr", "nl", "en"]
              .sort((lang) => (lang === language ? -1 : 1))
              .map((lang) => {
                const disabled =
                  formData[lang + "-name"] == null ||
                  (formData[lang + "-name"] as string).length < 1 ||
                  formData[lang + "-description"] == null ||
                  (formData[lang + "-description"] as string).length < 1;
                return (
                  <StyledLanguageBadge
                    key={lang}
                    selected={lang === currentLang}
                    disabled={disabled}
                    onClick={() => setCurrentLang(lang as Lang)}
                  >
                    {t(`languages.${lang}`)}
                  </StyledLanguageBadge>
                );
              })}
          </StyledLanguageBadgeContainer>
          <StyledLanguageContainer>
            <StyledLanguageContent>
              <TextInput
                id="name"
                type="text"
                label={t("events.create.fields.name.title")}
                value={(formData[currentLang + "-name"] as string) ?? ""}
                onChange={(e) =>
                  handleChange(e.target.value, currentLang + "-name")
                }
                placeholder={t("events.create.fields.name.placeholder")}
              />
              <TextArea
                id="description"
                label={t("events.create.fields.description.title")}
                value={(formData[currentLang + "-description"] as string) ?? ""}
                onChange={(e) =>
                  handleChange(e.target.value, currentLang + "-description")
                }
                placeholder={t("events.create.fields.description.placeholder")}
              />
            </StyledLanguageContent>
            {formErrors.content &&
              formErrors.content.map((error) => (
                <StyledError>{error}</StyledError>
              ))}
          </StyledLanguageContainer>
        </Col>
        <Col span={6}>
          <Tip
            type="info"
            title={t("events.create.fields.contents.tip.title")}
            description={t("events.create.fields.contents.tip.description")}
          />
        </Col>
      </StyledRow>
      <StyledRow gutter={24}>
        <Col span={8}>
          <h3>{t("events.create.fields.dates.title")}</h3>
          <p>{t("events.create.fields.dates.description")}</p>
          <RangePicker
            allowClear={false}
            onChange={(_, f) => {
              setFormData((prev) => ({
                ...prev,
                startDate: new Date(f[0]).toISOString(),
                endDate: new Date(f[1]).toISOString(),
              }));
              setFormErrors((prev) => ({ ...prev, startDate: [] }));
            }}
            errors={showErrors ? formErrors.startDate?.map((e) => t(e)) : []}
          />
        </Col>
        <Col span={8}>
          <h3>{t("events.create.fields.location.title")}</h3>
          <p>{t("events.create.fields.location.description")}</p>
          <TextInput
            id="location"
            type="text"
            value={formData.location as string}
            onChange={(e) =>
              handleChange(e.target.value, "location", {
                minLength: 10,
                required: true,
              })
            }
            errors={showErrors ? formErrors.location?.map((e) => t(e)) : []}
            placeholder={t("events.create.fields.location.placeholder")}
          />
        </Col>
      </StyledRow>
      <StyledRow gutter={24}>
        <Col span={8}>
          <h3>{t("events.create.fields.capacity.title")}</h3>
          <p>{t("events.create.fields.capacity.description")}</p>
          <TextInput
            id="capacity"
            type="tel"
            value={formData.capacity as number}
            onChange={(e) => {
              !/\D/g.test(e.target.value) &&
                handleChange(parseInt(e.target.value, 10), "capacity");
              setFormErrors((prev) => ({
                ...prev,
                capacity: !e.target.value ? ["forms.errors.required"] : [],
              }));
            }}
            errors={showErrors ? formErrors.capacity?.map((e) => t(e)) : []}
            placeholder={t("events.create.fields.capacity.placeholder")}
          />
        </Col>
        <Col span={8}>
          <Switch
            label={t("events.create.fields.details.wifi.title")}
            id="wifi"
            onChange={(checked) =>
              setFormData((prev) => ({ ...prev, wifi: checked }))
            }
          />
          <Switch
            label={t("events.create.fields.details.public.title")}
            id="public"
            onChange={(checked) =>
              setFormData((prev) => ({ ...prev, public: checked }))
            }
          />
          <Switch
            label={t("events.create.fields.details.parking.title")}
            id="parking"
            onChange={(checked) =>
              setFormData((prev) => ({ ...prev, parking: checked }))
            }
          />
          <Switch
            label={t("events.create.fields.details.disabilityFriendly.title")}
            id="disability"
            onChange={(checked) =>
              setFormData((prev) => ({ ...prev, disability: checked }))
            }
          />
        </Col>
        <Col span={6}>
          <Tip
            type="info"
            title={t("events.create.fields.details.tip.title")}
            description={t("events.create.fields.details.tip.description")}
          />
        </Col>
      </StyledRow>
      <StyledRow>
        <Col>
          <h3>{t("events.create.submit.title")}</h3>
          <p>{t("events.create.submit.description")}</p>
          <Button
            label={t("events.create.submit.button")}
            onClick={handleSubmit}
          />
        </Col>
      </StyledRow>
    </EventsListApp>
  );
};

export default CreateEvent;
