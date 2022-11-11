import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EventApp } from "../../../layouts/app/event";
import Heading from "../../../components/heading";

import { useGetEventQuery } from "../../../services";

const Sellers = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data } = useGetEventQuery(id as string);

  return (
    <EventApp>
      <Heading>{t("event.sellers.title")}</Heading>
    </EventApp>
  );
};

export default Sellers;
