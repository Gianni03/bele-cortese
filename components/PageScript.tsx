"use client";

import { useEffect } from "react";

type PageScriptProps = {
  scripts: string[];
};

export function PageScript({ scripts }: PageScriptProps) {
  useEffect(() => {
    for (const code of scripts) {
      try {
        new Function(code)();
      } catch (error) {
        console.error("Page script failed", error);
      }
    }
  }, [scripts]);

  return null;
}
