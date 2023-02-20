import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EventApp } from "../../../layouts/app/event";
import Heading from "../../../components/heading";
import { useGetEvent } from "../../../services";
const Cashiers = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data } = useGetEvent(parseInt(id ?? "", 10));

  return (
    <EventApp>
      <Heading>{t("event.cashiers.title")}</Heading>
    </EventApp>
  );
};

export default Cashiers;
