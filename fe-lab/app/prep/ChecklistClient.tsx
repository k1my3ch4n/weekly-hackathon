"use client";

import dynamic from "next/dynamic";

const Checklist = dynamic(() => import("./Checklist"), { ssr: false });

export default function ChecklistClient() {
  return <Checklist />;
}
