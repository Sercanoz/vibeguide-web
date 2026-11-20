import type { Metadata } from "next";
import GroupsView from "./GroupsView";

export const metadata: Metadata = {
  alternates: { canonical: "/groups" },
  title: "Group & Corporate Tours in Türkiye",
  description:
    "Company trips, school groups, cruise shore excursions and incentive programmes in Türkiye with licensed professional guides. Request a quote.",
};

export default function GroupsPage() {
  return <GroupsView />;
}
