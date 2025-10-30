"use client";

import { useEffect } from "react";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
// We mock upload client-side to avoid browser XHR progress/runtime quirks
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

export default function UploadDashboard({
  kind,
  onStart,
  onComplete,
}: {
  kind: "text" | "image" | "video";
  onStart: () => void;
  onComplete: () => void;
}) {
  useEffect(() => {
    const uppy = new Uppy({
      autoProceed: false,
      restrictions: {
        allowedFileTypes:
          kind === "text" ? [".txt", ".md", ".pdf"] : kind === "image" ? ["image/*"] : ["video/*"],
      },
    })
      .use(Dashboard, {
        inline: true,
        target: "#uppy-root-" + kind,
        height: 320,
        showProgressDetails: true,
        hideUploadButton: true,
        note: kind === "text" ? "TXT, MD, PDF" : kind === "image" ? "Images" : "Videos",
        proudlyDisplayPoweredByUppy: false,
      });

    // Trigger a mocked analyze flow when files are added
    uppy.on("files-added", () => {
      onStart();
      // brief delay to emulate upload then analysis
      setTimeout(() => onComplete(), 600);
    });

    return () => {
      try {
        const dash: any = uppy.getPlugin('Dashboard');
        if (dash && typeof dash.close === 'function') {
          dash.close();
        }
        if (typeof uppy.cancelAll === 'function') {
          uppy.cancelAll();
        }
      } finally {
        if (typeof uppy.destroy === 'function') {
          uppy.destroy();
        }
      }
    };
  }, [kind, onStart, onComplete]);

  return <div id={"uppy-root-" + kind} className="rounded-xl border p-2" />;
}


