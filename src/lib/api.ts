export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://haritaapitest-production.up.railway.app";

export type TripActiveResponse = {
  status: "active";
  touristName: string;
  tourTitle: string | null;
  guideName: string | null;
  scheduledAt: string | null;
  bookingStatus: number; // BookingStatus enum value
  location: {
    guideLat: number;
    guideLng: number;
    touristLat: number;
    touristLng: number;
    distanceMeters: number;
    eta: string | null;
    tourStarted: boolean;
  } | null;
  expiresAt: string | null;
};

export type TripEndedResponse = {
  status: "ended";
  touristName: string;
  tourTitle: string | null;
};

export type TripResponse = TripActiveResponse | TripEndedResponse;

export async function fetchPublicTrip(
  token: string
): Promise<{ ok: true; data: TripResponse } | { ok: false; status: number }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/public/trips/${token}`, {
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, status: res.status };
    const data = (await res.json()) as TripResponse;
    return { ok: true, data };
  } catch {
    return { ok: false, status: 0 };
  }
}
