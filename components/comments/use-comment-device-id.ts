import { useEffect, useState } from "react";

const STORAGE_KEY = "cyclist-comments-device-id";

export const useCommentDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string>();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing) {
      setDeviceId(existing);
      return;
    }

    const id = crypto.randomUUID().replace(/-/g, "");
    window.localStorage.setItem(STORAGE_KEY, id);
    setDeviceId(id);
  }, []);

  return deviceId;
};
