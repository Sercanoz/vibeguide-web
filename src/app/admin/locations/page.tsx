"use client";

import { useEffect, useState } from "react";
import { adminApi, type LocationTreeCountry } from "@/lib/admin-api";

export default function AdminLocationsPage() {
  const [tree, setTree] = useState<LocationTreeCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const [newProvince, setNewProvince] = useState<Record<number, string>>({});
  const [newDistrict, setNewDistrict] = useState<Record<number, string>>({});

  async function load() {
    const r = await adminApi.locationTree();
    if (r.ok) setTree(r.data);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function showFlash(m: string) { setFlash(m); setTimeout(() => setFlash(null), 3500); }

  async function onImport() {
    if (!confirm("Import curated Turkey tourism locations? Existing ones are skipped.")) return;
    setImporting(true);
    const r = await adminApi.importTurkey();
    setImporting(false);
    if (r.ok) { showFlash(`Imported ✓ +${r.data.addedProvinces} provinces, +${r.data.addedDistricts} districts`); load(); }
    else showFlash("Import failed");
  }

  async function addProvince(countryId: number) {
    const name = (newProvince[countryId] ?? "").trim();
    if (!name) return;
    const r = await adminApi.addProvince(countryId, name);
    if (r.ok) { setNewProvince((s) => ({ ...s, [countryId]: "" })); load(); }
    else showFlash("Could not add province");
  }
  async function addDistrict(provinceId: number) {
    const name = (newDistrict[provinceId] ?? "").trim();
    if (!name) return;
    const r = await adminApi.addDistrict(provinceId, name);
    if (r.ok) { setNewDistrict((s) => ({ ...s, [provinceId]: "" })); load(); }
    else showFlash("Could not add district");
  }
  async function delProvince(id: number, name: string) {
    if (!confirm(`Delete province "${name}" and all its districts?`)) return;
    await adminApi.deleteProvince(id); load();
  }
  async function delDistrict(id: number) {
    await adminApi.deleteDistrict(id); load();
  }

  function toggle(id: number) {
    setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#0A0A0F]">Locations</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage countries, provinces and districts used in tours.</p>
        </div>
        <button onClick={onImport} disabled={importing}
          className="shrink-0 bg-[#6C4CF1] text-white font-bold px-5 py-2.5 rounded-2xl text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50">
          {importing ? "Importing…" : "⤓ Import Turkey"}
        </button>
      </div>

      {flash && <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-semibold text-emerald-700">{flash}</div>}

      {loading ? (
        <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
      ) : tree.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/[0.06] p-10 text-center">
          <p className="text-sm font-bold text-neutral-500">No locations yet</p>
          <p className="text-xs text-neutral-400 mt-1">Click &ldquo;Import Turkey&rdquo; to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tree.map((country) => (
            <div key={country.id} className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
              <div className="px-5 py-3.5 bg-neutral-50 border-b border-black/[0.06] flex items-center gap-2">
                <span className="text-lg">{country.flag}</span>
                <span className="font-black text-[#0A0A0F]">{country.name}</span>
                <span className="text-xs text-neutral-400 ml-auto">{country.provinces.length} provinces</span>
              </div>

              <div className="divide-y divide-black/[0.04]">
                {country.provinces.map((prov) => (
                  <div key={prov.id}>
                    <div className="flex items-center gap-2 px-5 py-3 hover:bg-neutral-50/50 transition-colors">
                      <button onClick={() => toggle(prov.id)} className="text-neutral-400 w-5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${expanded.has(prov.id) ? "rotate-90" : ""}`}><path d="M9 18l6-6-6-6"/></svg>
                      </button>
                      <span className="font-bold text-sm text-[#0A0A0F]">{prov.name}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">/{prov.slug}</span>
                      <span className="text-xs text-neutral-400">· {prov.districts.length}</span>
                      <button onClick={() => delProvince(prov.id, prov.name)}
                        className="ml-auto text-red-400 hover:text-red-600 text-xs font-bold">Delete</button>
                    </div>

                    {expanded.has(prov.id) && (
                      <div className="pl-12 pr-5 pb-4 space-y-1.5 bg-neutral-50/40">
                        {prov.districts.map((d) => (
                          <div key={d.id} className="flex items-center gap-2 text-sm py-1">
                            <span className="text-neutral-600">{d.name}</span>
                            <span className="text-[10px] text-neutral-400 font-mono">/{d.slug}</span>
                            <button onClick={() => delDistrict(d.id)} className="ml-auto text-red-300 hover:text-red-500 text-xs">✕</button>
                          </div>
                        ))}
                        <div className="flex gap-2 pt-2">
                          <input value={newDistrict[prov.id] ?? ""} onChange={(e) => setNewDistrict((s) => ({ ...s, [prov.id]: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && addDistrict(prov.id)}
                            className="flex-1 border border-black/10 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#6C4CF1]"
                            placeholder="Add district…" />
                          <button onClick={() => addDistrict(prov.id)}
                            className="bg-[#6C4CF1] text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#5a3dd4] transition-colors">+ Add</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add province */}
              <div className="px-5 py-3 border-t border-black/[0.06] flex gap-2">
                <input value={newProvince[country.id] ?? ""} onChange={(e) => setNewProvince((s) => ({ ...s, [country.id]: e.target.value }))}
                  onKeyDown={(e) => e.key === "Enter" && addProvince(country.id)}
                  className="flex-1 border border-black/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#6C4CF1]"
                  placeholder="Add province…" />
                <button onClick={() => addProvince(country.id)}
                  className="bg-neutral-900 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">+ Province</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
