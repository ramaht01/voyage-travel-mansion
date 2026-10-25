
import { useEffect } from "react";

type PageSEOProps = {
  title: string;
  description: string;
};

const homeTitle =
  "Voyage Travel Mansion | Flights & Visa Services in Johannesburg";

const homeDescription =
  "Voyage Travel Mansion provides flight bookings, visa application assistance, international travel planning and travel insurance in Johannesburg, South Africa.";

export default function PageSEO({
  title,
  description,
}: PageSEOProps) {
  useEffect(() => {
    document.title = title;

    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = homeTitle;

      if (meta) {
        meta.setAttribute("content", homeDescription);
      }
    };
  }, [title, description]);

  return null;
}
