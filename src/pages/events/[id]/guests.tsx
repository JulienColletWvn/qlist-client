import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EventApp } from "../../../layouts/app/event";
import Heading from "../../../components/heading";
import { useGetEvent } from "../../../services";

import { Button } from "antd";

const Guests = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data } = useGetEvent(parseInt(id ?? "", 10));

  return (
    <EventApp>
      <Heading>{t("event.guests.title")}</Heading>
      <h1>{`${data?.guests.length} guests`}</h1>
      <Button onClick={() => null}>Add Guest</Button>
    </EventApp>
  );
};

export default Guests;
