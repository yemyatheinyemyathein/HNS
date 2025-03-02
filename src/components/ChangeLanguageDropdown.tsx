import { useTranslation } from "react-i18next";
import Dropdown from "../components/ui/Dropdown"
import { Globe } from "../svg/svg";

const ChangeLanguageDropdown = () => {
  const { i18n } = useTranslation();

  // Dropdown items for languages
  const items = [
    {
      label: "Burmese",
      onclick: () => i18n.changeLanguage("mm"),
    },
    {
      label: "English",
      onclick: () => i18n.changeLanguage("en"),
    },
  ];

  return <Dropdown buttonLabel={<Globe />} items={items} />;
};

export default ChangeLanguageDropdown;
