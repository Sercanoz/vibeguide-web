import type { Metadata } from "next";
import AccountDeletionView from "./AccountDeletionView";

export const metadata: Metadata = {
  alternates: { canonical: "/account-deletion" },
  title: "Delete Your Account",
  description: "How to permanently delete your VibeGuide account from within the app or by email.",
};

export default function AccountDeletionPage() {
  return <AccountDeletionView />;
}
