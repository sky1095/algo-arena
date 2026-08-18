"use client";

import { useEffect, useState } from "react";
import { Minus, Square, X, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    electronAPI?: {
      isElectron: boolean;
      platform: string;
      minimize: () => void;
      maximize: () => void;
      close: () => void;
      isMaximized: () => Promise<boolean>;
      onMaximizeChange: (callback: (maximized: boolean) => void) => () => void;
    };
  }
}

function useElectron() {
  const [electron, setElectron] = useState<{
    platform: string;
    controls: NonNullable<Window["electronAPI"]>;
  } | null>(null);

  useEffect(() => {
    if (window.electronAPI?.isElectron) {
      setElectron({
        platform: window.electronAPI.platform,
        controls: window.electronAPI,
      });
    }
  }, []);

  return electron;
}

export function TitleBar() {
  const electron = useElectron();

  // Not in Electron — render nothing
  if (!electron) return null;

  const isMac = electron.platform === "darwin";

  return (
    <div
      className={cn(
        "flex h-9 shrink-0 select-none items-center border-b bg-background",
        isMac ? "justify-center pl-[72px] pr-3" : "justify-between pl-3 pr-0"
      )}
      style={{ WebkitAppRegion: "drag" } as React.CSSProperties}
    >
      {/* App title — centered on macOS, left-aligned on Windows/Linux */}
      {!isMac && <TitleText />}
      {isMac && <TitleText />}

      {/* Window controls — only on Windows/Linux */}
      {!isMac && <WindowControls controls={electron.controls} />}
    </div>
  );
}

function TitleText() {
  return (
    <span className="text-xs font-medium text-muted-foreground">Algo Arena</span>
  );
}

function WindowControls({
  controls,
}: {
  controls: NonNullable<Window["electronAPI"]>;
}) {
  const [maximized, setMaximized] = useState(false);

  useEffect(() => {
    controls.isMaximized().then(setMaximized);
    const unsub = controls.onMaximizeChange(setMaximized);
    return unsub;
  }, [controls]);

  return (
    <div
      className="flex h-full"
      style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
    >
      <button
        onClick={controls.minimize}
        className="flex h-full w-11 items-center justify-center text-muted-foreground transition-colors hover:bg-muted"
        aria-label="Minimize"
      >
        <Minus className="h-4 w-4" />
      </button>
      <button
        onClick={controls.maximize}
        className="flex h-full w-11 items-center justify-center text-muted-foreground transition-colors hover:bg-muted"
        aria-label={maximized ? "Restore" : "Maximize"}
      >
        {maximized ? (
          <Maximize2 className="h-3.5 w-3.5" />
        ) : (
          <Square className="h-3 w-3" />
        )}
      </button>
      <button
        onClick={controls.close}
        className="flex h-full w-11 items-center justify-center text-muted-foreground transition-colors hover:bg-red-500 hover:text-white"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
