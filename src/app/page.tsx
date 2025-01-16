"use client"

import { useState } from "react";
import styles from "./page.module.css";

const createHandleFileUpload =
  (
    onProgress: (n: number) => void,
    onSuccess: () => void,
    onError: (error: string) => void
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", function (event) {
      if (event.lengthComputable) {
        onProgress(event.loaded / event.total);
      } else {
        onProgress(0);
      }
    });

    xhr.upload.addEventListener("load", function (event) {
      console.warn("Load", event);
    });

    xhr.upload.addEventListener("error", function (event) {
      console.error("Error event", event);
    });

    xhr.upload.addEventListener("abort", function (event) {
      console.error("Abort", event);
    });

    xhr.upload.addEventListener("timeout", function (event) {
      console.error("Timeout", event);
    });

    // req.readyState
    //   0 == Unsent
    //   1 == Opened
    //   2 == Headers received
    //   3 == Loading
    //   4 == Done
    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 400) {
          onSuccess();
        } else {
          console.error(`HTTP Error ${xhr.status}: ${xhr.statusText}`);
          onError(`HTTP ${xhr.status}`);
        }
      }
    });

    xhr.open("POST", "/api/upload", true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.send(file);
  };

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <progress value={progress} max="1" />
          <input
            type="file"
            id="fileInput"
            onChange={createHandleFileUpload(setProgress, () => setSuccess(true), setError)}
          />
          {error && <p>Error: {error}</p>}
          {success && <p>Upload successful!</p>}
        </div>
      </main>
    </div>
  );
}
