import { redirect } from "next/navigation";

// /attractions → EN hub (dilli hub'lar /attractions/<lang> altında).
export default function AttractionsIndex() {
  redirect("/attractions/en");
}
