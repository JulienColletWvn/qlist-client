import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EventApp } from "../../../layouts/app/event";
import Heading from "../../../components/heading";

const Transactions = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  return (
    <EventApp>
      <Heading>{t("event.transactions.title")}</Heading>
    </EventApp>
  );
};

export default Transactions;
