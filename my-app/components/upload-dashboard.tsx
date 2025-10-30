"use client";

import { useEffect, useRef } from "react";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import XHRUpload from "@uppy/xhr-upload";
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
  const uppyRef = useRef<Uppy.Uppy | null>(null);

  useEffect(() => {
    const uppy = new Uppy({
      autoProceed: false,
      restrictions: {
        allowedFileTypes:
          kind === "text" ? [".txt", ".md", ".pdf"] : kind === "image" ? ["image/*"] : ["video/*"],
      },
    })
      .use(XHRUpload, { endpoint: "/api/upload", method: "POST" })
      .use(Dashboard, {
        inline: true,
        target: "#uppy-root-" + kind,
        height: 320,
        showProgressDetails: true,
        note: kind === "text" ? "TXT, MD, PDF" : kind === "image" ? "Images" : "Videos",
        proudlyDisplayPoweredByUppy: false,
      });

    uppyRef.current = uppy;

    uppy.on("upload", () => onStart());
    uppy.on("complete", () => onComplete());

    return () => {
      uppy.close();
    };
  }, [kind, onStart, onComplete]);

  return <div id={"uppy-root-" + kind} className="rounded-xl border p-2" />;
}


