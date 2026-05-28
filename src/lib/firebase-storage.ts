"use client";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fbApp } from "./firebase-client";

export type UploadProgress = { progress: number; url?: string; error?: string };

/**
 * Upload a file to Firebase Storage under tours/{tourId}/{filename}
 * Returns the public download URL.
 */
export function uploadTourPhoto(
  tourId: number,
  file: File,
  onProgress: (p: UploadProgress) => void
): () => void {
  const storage = getStorage(fbApp());
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `tours/${tourId}/${Date.now()}.${ext}`;
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file, {
    contentType: file.type,
    cacheControl: "public,max-age=31536000",
  });

  task.on(
    "state_changed",
    (snap) => {
      const progress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      onProgress({ progress });
    },
    (err) => {
      onProgress({ progress: 0, error: err.message });
    },
    async () => {
      const url = await getDownloadURL(task.snapshot.ref);
      onProgress({ progress: 100, url });
    }
  );

  // Return cancel function
  return () => task.cancel();
}
