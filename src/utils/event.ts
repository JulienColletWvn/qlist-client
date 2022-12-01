import { Event } from "../services/event";
import { Lang } from "../types";

export const getEventContent = ({
  lang,
  event,
}: {
  lang: Lang;
  event: Event;
}): { name: string; description: string } => {
  const { contents } = event;

  const translatedContent = contents.reduce(
    (acc, { lang, content, type }) => ({
      ...acc,
      [lang]: { ...acc[lang as Lang], [type]: content },
    }),
    {} as Record<Lang, { name: string; description: string }>
  );

  return (
    translatedContent[lang] ||
    translatedContent.en ||
    Object.values(translatedContent)[0] || { name: "", description: "" }
  );
};
