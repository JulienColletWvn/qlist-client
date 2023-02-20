import { useTranslation } from "react-i18next";
import { ContactsApp } from "../../layouts/app/contacts";
import { Table } from "../../components/table";
import { useGetContacts } from "../../services";

const Contacts = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetContacts();

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
      <Table columns={columns} dataSource={Array.isArray(data) ? data : []} />
    </ContactsApp>
  );
};

export default Contacts;
