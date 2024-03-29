import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Row, Col } from "../../components/layout";
import Heading from "../../components/heading";
import { EventsListApp } from "../../layouts/app";

import { Event } from "../../layouts/events/event";
import { NoEvent } from "../../layouts/events/noEvent";
import { useGetEvents } from "../../services";

const StyledCol = styled(Col)`
  display: flex;
  margin-bottom: 1rem;
`;

const Events = () => {
  const { data, isLoading } = useGetEvents();
  const navigate = useNavigate();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <EventsListApp isLoading={isLoading}>
      {data && data.length === 0 && <NoEvent />}
      {data && data.length > 0 && (
        <>
          <Heading>{t("events.list.title")}</Heading>
          <Row gutter={16}>
            {data &&
              data.length > 0 &&
              data.map((event) => (
                <StyledCol span={6} key={event.id}>
                  <Event
                    event={event}
                    onClick={() => navigate(`/events/${event.id}/details`)}
                  />
                </StyledCol>
              ))}
          </Row>
        </>
      )}
    </EventsListApp>
  );
};

export default Events;
