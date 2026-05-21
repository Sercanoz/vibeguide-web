import type { Metadata } from "next";
import { fetchPublicTrip } from "@/lib/api";
import TripView from "./TripView";

type Props = { params: Promise<{ token: string }> };

export const metadata: Metadata = {
  title: "Live trip · VibeGuide",
  description:
    "Watch a VibeGuide trip in real time — shared by the traveller for safety.",
  robots: { index: false, follow: false },
};

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
