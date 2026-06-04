import type { Metadata } from "next";
import AccountDeletionView from "./AccountDeletionView";

export const metadata: Metadata = {
  alternates: { canonical: "/account-deletion" },
  title: "Hesabınızı Silin | VibeGuide",
  description: "VibeGuide hesabınızı uygulama içinden veya e-posta ile kalıcı olarak nasıl silersiniz.",
};

export default function AccountDeletionPage() {
  return <AccountDeletionView />;
}
