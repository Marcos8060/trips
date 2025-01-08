"use client";
import React from "react";
import MenuChildren from "./menu-children";

const Sidebar = () => {
  return (
    <section className="bg-background shadow h-screen">
      <div className="h-[8vh] flex items-center justify-center">
        <h1 className="text-white text-2xl font-bold italic">Trip<span className="text-yellow">Finder</span></h1>
      </div>
      <div className="space-y-10 text-background my-4 px-6 py-8">
        <MenuChildren />
      </div>
    </section>
  );
};

export default Sidebar;
