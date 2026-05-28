"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { authedFetch } from "@/lib/admin-api";

type Props = { params: Promise<{ id: string }> };

type UserDetail = {
  id: number; fullName: string; email: string; role: string;
  createdAtUtc: string; isActive: boolean; phoneNumber: string | null;
  guideProfile?: { city: string | null; languages: string | null; rating: number | null; reviewCount: number };
  touristProfile?: { nationality: string | null; preferredLanguage: string | null };
};

type Booking = {
  id: number; tourTitle: string; guideName: string; touristName: string;
  scheduledAt: string; status: string; price: number; currency: string;
};

const STATUS_COLOR: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Paid: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-neutral-100 text-neutral-500",
  Rejected: "bg-red-100 text-red-600",
};

const ROLE_COLOR: Record<string, string> = {
  Tourist: "bg-emerald-100 text-emerald-700",
  Guide: "bg-blue-100 text-blue-700",
  PendingGuide: "bg-amber-100 text-amber-700",
  Admin: "bg-[#6C4CF1]/10 text-[#6C4CF1]",
};

export default function UserDetailPage(props: Props) {
  const { id } = use(props.params);
  const userId = parseInt(id, 10);
  const [user, setUser] = useState<UserDetail | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState<string | null>(null);
  const [changingRole, setChangingRole] = useState(false);

  useEffect(() => {
    Promise.all([
      authedFetch<UserDetail>(`/api/admin/users/${userId}`),
      authedFetch<{ total: number; rows: Booking[] }>(`/api/admin/bookings?limit=20&offset=0`),
    ]).then(([ur, br]) => {
      if (ur.ok) setUser(ur.data);
      if (br.ok) setBookings(br.data.rows.filter(b => b.touristName || b.guideName));
      setLoading(false);
    });
  }, [userId]);

  async function onRoleChange(newRole: string) {
    if (!confirm(`Change role to ${newRole}?`)) return;
    setChangingRole(true);
    const r = await authedFetch<{ id: number; role: string }>(`/api/admin/users/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role: newRole }),
    });
    setChangingRole(false);
    if (r.ok) { setFlash("Role updated ✓"); setUser(u => u ? { ...u, role: newRole } : u); }
    else setFlash("Failed: " + (r.error ?? r.status));
    setTimeout(() => setFlash(null), 3000);
  }

  if (loading) return <div className="p-8 text-neutral-400 text-sm">Loading…</div>;
  if (!user) return <div className="p-8 text-red-500 text-sm">User not found</div>;

  return (
    <div className="p-8 max-w-4xl">
      <Link href="/admin/users" className="text-xs font-black text-neutral-400 hover:text-[#0A0A0F] mb-6 inline-block">← All users</Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#6C4CF1]/10 flex items-center justify-center mb-4 text-2xl font-black text-[#6C4CF1]">
              {user.fullName[0]?.toUpperCase()}
            </div>
            <h1 className="text-lg font-black text-[#0A0A0F]">{user.fullName}</h1>
            <p className="text-sm text-neutral-400">{user.email}</p>
            {user.phoneNumber && <p className="text-sm text-neutral-400 mt-1">{user.phoneNumber}</p>}

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Role</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${ROLE_COLOR[user.role] ?? "bg-neutral-100 text-neutral-600"}`}>{user.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Status</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${user.isActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Joined</span>
                <span className="text-xs font-semibold text-neutral-600">{new Date(user.createdAtUtc).toLocaleDateString("en-GB")}</span>
              </div>
            </div>

            {/* Guide profile extras */}
            {user.guideProfile && (
              <div className="mt-4 pt-4 border-t border-black/[0.06] space-y-2">
                {user.guideProfile.city && (
                  <div className="flex justify-between"><span className="text-xs text-neutral-400">City</span><span className="text-xs font-semibold">{user.guideProfile.city}</span></div>
                )}
                {user.guideProfile.languages && (
                  <div className="flex justify-between"><span className="text-xs text-neutral-400">Languages</span><span className="text-xs font-semibold">{user.guideProfile.languages}</span></div>
                )}
                {user.guideProfile.rating && (
                  <div className="flex justify-between"><span className="text-xs text-neutral-400">Rating</span><span className="text-xs font-bold text-amber-600">⭐ {user.guideProfile.rating} ({user.guideProfile.reviewCount})</span></div>
                )}
              </div>
            )}

            {/* Change role */}
            <div className="mt-5 pt-4 border-t border-black/[0.06]">
              <p className="text-xs font-black text-neutral-400 uppercase tracking-wide mb-2">Change role</p>
              <div className="flex flex-wrap gap-1.5">
                {["Tourist","Guide","PendingGuide","Admin"].filter(r => r !== user.role).map(r => (
                  <button key={r} onClick={() => onRoleChange(r)} disabled={changingRole}
                    className="px-3 py-1 rounded-lg text-xs font-bold border border-black/10 hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1] transition-colors disabled:opacity-50">
                    → {r}
                  </button>
                ))}
              </div>
              {flash && <p className="text-xs font-semibold text-emerald-600 mt-2">{flash}</p>}
            </div>
          </div>
        </div>

        {/* Bookings */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-black text-[#0A0A0F] mb-3">Recent bookings</h2>
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-black/[0.06] p-6 text-center text-sm text-neutral-400">No bookings found</div>
          ) : (
            <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
              {bookings.slice(0, 10).map((b) => (
                <div key={b.id} className="flex items-center gap-3 px-4 py-3 border-b border-black/[0.04] last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0A0A0F] truncate">{b.tourTitle ?? `Booking #${b.id}`}</p>
                    <p className="text-xs text-neutral-400">{new Date(b.scheduledAt).toLocaleDateString("en-GB")}</p>
                  </div>
                  <span className="text-sm font-bold text-[#6C4CF1]">{b.price} {b.currency}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[b.status] ?? "bg-neutral-100 text-neutral-500"}`}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
