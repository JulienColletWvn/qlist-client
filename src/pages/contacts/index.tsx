import { useTranslation } from "react-i18next";
import { ContactsApp } from "../../layouts/app/contacts";
import Heading from "../../components/heading";
import { useGetContactsQuery } from "../../services";
import { Table } from "../../components/table";

const Contacts = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetContactsQuery();

  return (
    <ContactsApp>
      <Heading>{t("contacts.list.title")}</Heading>
      <Table
        columns={[
          { title: "Firstname", dataIndex: "firstname", key: "firstname" },
          { title: "Lastname", dataIndex: "lastname", key: "lastname" },
          { title: "Phone", dataIndex: "phone", key: "phone" },
          { title: "Email", dataIndex: "email", key: "email" },
        ]}
        dataSource={data}
      />
    </ContactsApp>
  );
};

export default Contacts;
