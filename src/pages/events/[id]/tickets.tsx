import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EventApp } from "../../../layouts/app/event";
import Heading from "../../../components/heading";

import { useGetEventQuery } from "../../../services";

const Tickets = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data } = useGetEventQuery(id as string);

  return (
    <EventApp>
      <Heading>{t("event.tickets.title")}</Heading>
    </EventApp>
  );
};

export default Tickets;
