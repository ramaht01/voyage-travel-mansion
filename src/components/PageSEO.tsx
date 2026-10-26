
import { useEffect } from "react";

type PageSEOProps = {
  title: string;
  description: string;
};

const homeTitle =
  "Voyage Travel Mansion | Flights & Visa Services in Johannesburg";

const homeDescription =
  "Voyage Travel Mansion provides flight bookings, visa application assistance, international travel planning and travel insurance in Johannesburg, South Africa.";

const baseUrl = "https://voyage-travel-mansion.vercel.app";

export default function PageSEO({
  title,
  description,
}: PageSEOProps) {
  useEffect(() => {
    // Set the SEO title
    document.title = title;

    // Set the meta description
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    if (meta) {
      meta.setAttribute("content", description);
    }

    // Set this service page's preferred URL
    let canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = `${baseUrl}${window.location.pathname}`;

    return () => {
      document.title = homeTitle;

      if (meta) {
        meta.setAttribute("content", homeDescription);
      }

      canonical?.remove();
    };
  }, [title, description]);

  return null;
}
