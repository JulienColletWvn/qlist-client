import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetEventsQuery } from "../../services";
import { Row, Col } from "../../components/layout";
import Heading from "../../components/heading";
import { EventsListApp } from "../../layouts/app";

import { Event } from "../../layouts/events/event";

const StyledCol = styled(Col)`
  display: flex;
  margin-bottom: 1rem;
`;

const Events = () => {
  const { data, isLoading } = useGetEventsQuery();
  const navigate = useNavigate();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <EventsListApp isLoading={isLoading}>
      <Heading>{t("events.list.title")}</Heading>
      <Row gutter={16}>
        {data?.map((event) => (
          <StyledCol span={6} key={event.ID}>
            <Event
              event={event}
              onClick={() => navigate(`/events/${event.ID}/details`)}
            />
          </StyledCol>
        ))}
      </Row>
    </EventsListApp>
  );
};

export default Events;
