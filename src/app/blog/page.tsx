import { redirect } from "next/navigation";

// Root /blog serves the English hub. Localized hubs live at /blog/<lang>.
export default function BlogRootPage() {
  redirect("/blog/en");
}
