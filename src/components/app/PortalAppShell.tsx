"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Bell,
  LogOut,
  ExternalLink,
  Sparkles,
  LucideIcon,
  ShieldCheck,
  Building2,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";
import NexoLogo from "@/components/NexoLogo";

export interface PortalNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: "blue" | "amber" | "teal" | "rose";
}

interface PortalAppShellProps {
  portalTitle: string;
  portalBadge: string;
  userName: string;
  userRole: string;
  userAvatar: string;
  navItems: PortalNavItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  children: React.ReactNode;
}

const portalDestinations = [
  { href: "/user", label: "Cliente", Icon: UserRound },
  { href: "/empresas", label: "Empresas", Icon: Building2 },
  { href: "/abogado", label: "Abogado", Icon: BriefcaseBusiness },
  { href: "/admin", label: "Admin", Icon: ShieldCheck },
];

export default function PortalAppShell({
  portalBadge,
  userName,
  userRole,
  userAvatar,
  navItems,
  activeTab,
  onTabChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Buscar causa, cliente o término...",
  children,
}: PortalAppShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPortalSwitch, setShowPortalSwitch] = useState(false);

  return (
    <div className="min-h-screen bg-[#070C14] text-slate-200 flex flex-col font-sans antialiased selection:bg-blue-600/30 selection:text-blue-200">
      {/* ─── 1. DESKTOP PERMANENT SIDEBAR (w-72) ─────────────────────────── */}
      <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 z-40 bg-[#0A0F17] border-r border-[#1E293B]">
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#1E293B]">
          <Link href="/" className="flex items-center group">
            <NexoLogo size="md" variant="dark" badge={portalBadge} />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3.5 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all active:scale-95 cursor-pointer text-left ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-600/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#131C2B] border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                      item.badgeColor === "amber"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : item.badgeColor === "teal"
                        ? "bg-[#00A9A3]/20 text-[#38DFD8] border border-[#00A9A3]/30"
                        : item.badgeColor === "rose"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Portal Switcher at Bottom */}
        <div className="p-3.5 border-t border-[#1E293B] bg-[#080D15]/80 space-y-2">
          <div className="flex items-center gap-3 px-2.5 py-2 rounded-xl bg-[#0D141F] border border-[#1E293B]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-[#00A9A3] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
              {userAvatar}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">{userRole}</p>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPortalSwitch(!showPortalSwitch)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-semibold text-slate-300 bg-[#131C2B] hover:bg-[#1A263A] hover:text-white transition-all border border-[#1E293B] active:scale-95 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A9A3]" />
                <span>Cambiar de Portal</span>
              </span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>

            {showPortalSwitch && (
              <div className="absolute bottom-full left-0 right-0 mb-2 p-2 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-2xl space-y-1 z-50">
                <p className="text-[10px] font-mono uppercase text-slate-400 px-2 py-1">
                  Ecosistema NexoLegal
                </p>
                {portalDestinations.map(({ href, label, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      pathname === href
                        ? "bg-blue-600 text-white font-bold"
                        : "text-slate-300 hover:bg-[#1A263A] hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ─── 2. MOBILE DRAWER SIDEBAR (lg:hidden) ────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-72 bg-[#0A0F17] border-r border-[#1E293B] flex flex-col justify-between shadow-2xl p-4 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
                <NexoLogo size="sm" variant="dark" badge={portalBadge} />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#131C2B]"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onTabChange(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                        isActive
                          ? "bg-blue-600/15 text-blue-400 border border-blue-500/30"
                          : "text-slate-400 hover:text-slate-200 hover:bg-[#131C2B]"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#1E293B] space-y-2">
              <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-[#0D141F]">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {userAvatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">{userName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{userRole}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1 pt-1">
                {portalDestinations.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-center py-1.5 rounded-lg bg-[#131C2B] text-[11px] font-medium text-slate-300 hover:text-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ─── 3. MAIN CONTENT CONTAINER (Offset on Desktop) ──────────────── */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0A0F17]/90 backdrop-blur-md border-b border-[#1E293B] px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#131C2B] lg:hidden cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>

            {onSearchChange && (
              <div className="relative w-48 sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue || ""}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0D141F] border border-[#1E293B] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-[#0D141F] hover:bg-[#131C2B] border border-[#1E293B] transition-all active:scale-95 cursor-pointer"
                title="Notificaciones"
                aria-label="Notificaciones"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0D141F] border border-[#1E293B] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between border-b border-[#1E293B] pb-2.5 mb-2.5">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      Alertas & Providencias SATJE
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#38DFD8]">Activas</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#080D15] border border-[#1E293B]">
                      <p className="font-bold text-blue-300 text-[11px]">Providencia Auto Interlocutorio</p>
                      <p className="text-[11px] text-slate-300 mt-0.5">Causa 17203-2026-03191 (Término 24h)</p>
                      <span className="text-[9px] font-mono text-slate-400 mt-1 block">Hace 1 hora</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Exit / Return to main site */}
            <Link
              href="/"
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-[#0D141F] hover:bg-[#131C2B] border border-[#1E293B] transition-all active:scale-95"
              title="Volver a NexoLegal público"
              aria-label="Volver a la web pública"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* ─── 4. MOBILE BOTTOM NAVIGATION BAR (STRICTLY lg:hidden) ─────────── */}
      <nav
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0A0F17]/95 backdrop-blur-xl border-t border-[#1E293B] px-2 py-1.5 shadow-2xl flex items-center justify-around"
        aria-label="Navegación móvil"
      >
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? "text-blue-400 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? "bg-blue-600/20" : ""}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 leading-tight truncate max-w-[64px]">
                {item.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
