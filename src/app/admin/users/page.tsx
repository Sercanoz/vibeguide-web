"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, type AdminUser } from "@/lib/admin-api";

type RoleFilter = "" | "Guide" | "Tourist" | "Admin";

const ROLE_COLORS: Record<string, string> = {
  Guide: "bg-blue-100 text-blue-700",
  Tourist: "bg-green-100 text-green-700",
  Admin: "bg-purple-100 text-purple-700",
};

function RoleBadge({ role }: { role: string }) {
  const color = ROLE_COLORS[role] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
      {role}
    </span>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("");
  const [acting, setActing] = useState<number | null>(null);
  const [flash, setFlash] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showFlash(msg: string, type: "ok" | "err" = "ok") {
    setFlash({ msg, type });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 4000);
  }

  async function loadUsers(search: string, role: RoleFilter) {
    setLoading(true);
    setError(null);
    const res = await adminApi.listUsers({
      q: search || undefined,
      role: role || undefined,
      limit: 50,
    });
    if (res.ok) {
      setUsers(res.data);
    } else {
      setError(res.error ?? "Failed to load users");
    }
    setLoading(false);
  }

  useEffect(() => { loadUsers("", ""); }, []);

  function handleSearch(value: string) {
    setQ(value);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => loadUsers(value, roleFilter), 400);
  }

  function handleRoleFilter(value: RoleFilter) {
    setRoleFilter(value);
    loadUsers(q, value);
  }

  async function changeRole(id: number, role: "Tourist" | "Guide" | "Admin") {
    if (!window.confirm(`Change this user's role to "${role}"?`)) return;
    setActing(id);
    const res = await adminApi.changeUserRole(id, role);
    if (res.ok) {
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
      showFlash("Role updated.", "ok");
    } else {
      showFlash(res.error ?? "Failed to change role", "err");
    }
    setActing(null);
  }

  async function deleteUser(id: number, name: string) {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;
    setActing(id);
    const res = await adminApi.deleteUser(id);
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      showFlash("User deleted.", "ok");
    } else {
      showFlash(res.error ?? "Failed to delete user", "err");
    }
    setActing(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">User Management</h1>
      <p className="mt-1 text-sm text-vg-muted">Search users, change their roles or delete them.</p>

      {flash && (
        <div className={`mt-3 rounded-xl px-4 py-3 text-sm font-semibold border ${
          flash.type === "ok"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {flash.msg}
        </div>
      )}

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          value={q}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by name or email…"
          className="flex-1 min-w-48 px-3 py-2 rounded-xl border border-vg-border text-sm text-vg-ink placeholder:text-vg-muted focus:outline-none focus:border-vg-primary"
        />
        <select
          value={roleFilter}
          onChange={(e) => handleRoleFilter(e.target.value as RoleFilter)}
          className="px-3 py-2 rounded-xl border border-vg-border text-sm text-vg-ink focus:outline-none focus:border-vg-primary bg-white"
        >
          <option value="">All roles</option>
          <option value="Tourist">Tourist</option>
          <option value="Guide">Guide</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-vg-muted text-sm">Loading…</div>
      ) : error ? (
        <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-red-600 font-semibold text-sm shadow-sm">
          {error}
        </div>
      ) : users.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-vg-muted text-sm shadow-sm">
          No users found
        </div>
      ) : (
        <div className="mt-5 rounded-2xl bg-white border border-vg-border shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-vg-border bg-vg-bg-soft">
                <th className="px-4 py-3 text-left text-xs font-bold text-vg-muted uppercase tracking-wide">Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-vg-muted uppercase tracking-wide hidden sm:table-cell">Email</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-vg-muted uppercase tracking-wide">Role</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-vg-muted uppercase tracking-wide hidden md:table-cell">Joined</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-vg-muted uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vg-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-vg-bg-soft transition-colors">
                  <td className="px-4 py-3 font-semibold text-vg-ink whitespace-nowrap">{u.fullName}</td>
                  <td className="px-4 py-3 text-vg-muted hidden sm:table-cell">{u.email}</td>
                  <td className="px-4 py-3">
                    <RoleBadge role={u.role} />
                  </td>
                  <td className="px-4 py-3 text-vg-muted hidden md:table-cell whitespace-nowrap">
                    {new Date(u.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <select
                        value={u.role}
                        onChange={(e) => changeRole(u.id, e.target.value as "Tourist" | "Guide" | "Admin")}
                        disabled={acting === u.id}
                        className="px-2 py-1 rounded-lg border border-vg-border text-xs text-vg-ink focus:outline-none focus:border-vg-primary bg-white disabled:opacity-50"
                      >
                        <option value="Tourist">Tourist</option>
                        <option value="Guide">Guide</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <button
                        disabled={acting === u.id}
                        onClick={() => deleteUser(u.id, u.fullName)}
                        className="px-2 py-1 rounded-lg text-xs font-bold border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
