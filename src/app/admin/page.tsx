"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Bot,
  Filter,
  Settings,
  Building2,
} from "lucide-react";
import {
  demoCases,
  DemoCase,
  judicialNotificationAIDemo,
  demoLeads,
  DemoLead,
} from "@/data/platformDemo";
import PortalAppShell, { PortalNavItem } from "@/components/app/PortalAppShell";
import { AdminActiveTab } from "@/components/admin/types";
import { mockB2BClients, mockLawyers } from "@/components/admin/data";
import AdminDashboardTab from "@/components/admin/AdminDashboardTab";
import AdminExpedientesTab from "@/components/admin/AdminExpedientesTab";
import AdminClientesTab from "@/components/admin/AdminClientesTab";
import AdminAbogadosTab from "@/components/admin/AdminAbogadosTab";
import AdminBuzonIATab from "@/components/admin/AdminBuzonIATab";
import AdminCRMTab from "@/components/admin/AdminCRMTab";
import AdminConfigTab from "@/components/admin/AdminConfigTab";
import CaseDetailModal from "@/components/admin/CaseDetailModal";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminActiveTab>("expedientes");
  const [searchGlobal, setSearchGlobal] = useState("");
  const [selectedCaseModal, setSelectedCaseModal] = useState<DemoCase | null>(null);
  const [leads, setLeads] = useState<DemoLead[]>(demoLeads);

  const updateLeadStatus = (id: string, newStatus: DemoLead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  };

  const navItems: PortalNavItem[] = [
    { id: "dashboard", label: "Dashboard General", icon: LayoutDashboard },
    { id: "expedientes", label: "Expedientes & Causas Activas", icon: Briefcase, badge: "3", badgeColor: "blue" },
    { id: "clientes", label: "Clientes & Retainers Corporativos", icon: Building2, badge: "4", badgeColor: "blue" },
    { id: "abogados", label: "Socios & Abogados Litigantes", icon: Users },
    { id: "buzon_ia", label: "Buzón Providencias SATJE (IA)", icon: Bot, badge: "SATJE", badgeColor: "amber" },
    {
      id: "crm",
      label: "CRM Leads Landing",
      icon: Filter,
      badge: leads.filter((l) => l.status === "Nuevo").length.toString(),
      badgeColor: "teal",
    },
    { id: "configuracion", label: "Configuración Institucional", icon: Settings },
  ];

  const searchedCases = demoCases.filter((c) => {
    if (!searchGlobal.trim()) return true;
    const q = searchGlobal.toLowerCase();
    return (
      c.code.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.client.toLowerCase().includes(q) ||
      c.assignedLawyer.toLowerCase().includes(q)
    );
  });

  const searchedClients = mockB2BClients.filter((cl) => {
    if (!searchGlobal.trim()) return true;
    const q = searchGlobal.toLowerCase();
    return cl.name.toLowerCase().includes(q) || cl.ruc.includes(q);
  });

  const searchedLawyers = mockLawyers.filter((law) => {
    if (!searchGlobal.trim()) return true;
    const q = searchGlobal.toLowerCase();
    return law.name.toLowerCase().includes(q) || law.specialty.toLowerCase().includes(q);
  });

  const searchedLeads = leads.filter((l) => {
    if (!searchGlobal.trim()) return true;
    const q = searchGlobal.toLowerCase();
    return l.name.toLowerCase().includes(q) || l.area.toLowerCase().includes(q);
  });

  return (
    <PortalAppShell
      portalTitle="NexoLegal Admin"
      portalBadge="ADMIN"
      userName="Dr. Pablo Andrade"
      userRole="Admin Principal & Socio Director"
      userAvatar="PA"
      navItems={navItems}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as AdminActiveTab)}
      searchValue={searchGlobal}
      onSearchChange={setSearchGlobal}
      searchPlaceholder="Buscar causa, cliente, juicio o SATJE..."
    >
      {activeTab === "dashboard" && (
        <AdminDashboardTab onNewCase={() => setActiveTab("expedientes")} />
      )}

      {activeTab === "expedientes" && (
        <AdminExpedientesTab
          cases={searchedCases}
          onSelectCase={(c) => setSelectedCaseModal(c)}
        />
      )}

      {activeTab === "clientes" && <AdminClientesTab clients={searchedClients} />}

      {activeTab === "abogados" && <AdminAbogadosTab lawyers={searchedLawyers} />}

      {activeTab === "buzon_ia" && <AdminBuzonIATab providencia={judicialNotificationAIDemo} />}

      {activeTab === "crm" && (
        <AdminCRMTab leads={searchedLeads} onUpdateStatus={updateLeadStatus} />
      )}

      {activeTab === "configuracion" && <AdminConfigTab />}

      <CaseDetailModal
        caseData={selectedCaseModal}
        onClose={() => setSelectedCaseModal(null)}
      />
    </PortalAppShell>
  );
}
