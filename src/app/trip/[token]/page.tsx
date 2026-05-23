import type { Metadata } from "next";
import { fetchPublicTrip } from "@/lib/api";
import TripView from "./TripView";

type Props = { params: Promise<{ token: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { token } = await props.params;
  const trip = await fetchPublicTrip(token);

  const base: Metadata = {
    robots: { index: false, follow: false },
  };

  if (!trip.ok) {
    return { ...base, title: "Trip not found · VibeGuide" };
  }

  const d = trip.data;
  const touristName = d.touristName ?? "A traveller";
  const tourTitle = d.tourTitle ? `— ${d.tourTitle}` : "";
  const status = d.status === "active" ? "🔴 LIVE" : "✅ Completed";

  const title = `${status} · ${touristName}'s trip ${tourTitle} · VibeGuide`;
  const description =
    d.status === "active"
      ? `${touristName} is currently on a guided tour in Turkey. Watch their live location — shared for safety.`
      : `${touristName}'s VibeGuide trip has ended safely. Book your own local guide in Istanbul, Cappadocia or Ephesus.`;

  return {
    ...base,
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "VibeGuide",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function TripPage(props: Props) {
  const { token } = await props.params;
  const initial = await fetchPublicTrip(token);
  return (
    <TripView
      token={token}
      initial={
        initial.ok
          ? { kind: "data", data: initial.data }
          : { kind: "error", status: initial.status }
      }
    />
  );
}
