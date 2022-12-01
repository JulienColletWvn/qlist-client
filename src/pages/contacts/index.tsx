import { useTranslation } from "react-i18next";
import { ContactsApp } from "../../layouts/app/contacts";
import Heading from "../../components/heading";
import { useGetContactsQuery } from "../../services";
import { Table } from "../../components/table";

const Contacts = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetContactsQuery();

  const columns = [
    {
      title: t("contacts.list.columns.firstname"),
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: t("contacts.list.columns.lastname"),
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: t("contacts.list.columns.phone"),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: t("contacts.list.columns.email"),
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <ContactsApp isLoading={isLoading}>
      <Heading>{t("contacts.list.title")}</Heading>
      <Table columns={columns} dataSource={data} />
    </ContactsApp>
  );
};

export default Contacts;
