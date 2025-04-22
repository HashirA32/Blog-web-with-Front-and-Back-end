import AppSidebar from "@/components/app-sidebar";
import Footer from "@/components/footer";
import Topbar from "@/components/topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <Topbar />
        <AppSidebar />
        <main className="w-full border border-amber-700">
          <div className="w-full h-auto min-h-[calc(100dvh-60px)]">
            Hi
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default Layout;
