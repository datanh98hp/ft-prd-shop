"use client";

import { configSWR } from "@/libs/config";
import { SWRConfig } from "swr";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={configSWR}>{children}</SWRConfig>;
};
