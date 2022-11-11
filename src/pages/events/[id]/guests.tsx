import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EventApp } from "../../../layouts/app/event";
import Heading from "../../../components/heading";

import { useGetEventQuery, useCreateGuestMutation } from "../../../services";
import { Button } from "antd";

const Guests = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data } = useGetEventQuery(id as string);
  const [addGuest, { isLoading, isError }] = useCreateGuestMutation();

  return (
    <EventApp>
      <Heading>{t("event.guests.title")}</Heading>
      <h1>{`${data?.guests.length} guests`}</h1>
      <Button
        onClick={() =>
          addGuest({ contactId: 44, eventId: parseInt(id as string, 10) })
        }
      >
        Add Guest
      </Button>
    </EventApp>
  );
};

export default Guests;
