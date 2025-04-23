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
        <main className="w-full">
          <div className="w-full h-auto min-h-[calc(100dvh-55px)]">
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarProvider>
    </>
  );
};

export default Layout;
