import React from "react";
import CustomizedHeader from "../components/layout/customized-header";
import Sidebar from "../components/layout/layout";


export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-row md:overflow-hidden bg-background">
      <section className="md:block hidden w-full flex-none md:w-1/5 border border-r-primary">
        <Sidebar />
      </section>
      <section className="w-full overflow-y-auto">
        <CustomizedHeader />
        <div className="flex-grow py-6 px-2 md:px-6 md:py-6 ">
          {children}
        </div>
      </section>
    </div>
  );
}
