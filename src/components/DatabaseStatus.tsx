import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

export const DatabaseStatus = () => {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const response = await api.getCardCount();
      setCount(response.count);
      setStatus("connected");
    } catch (error) {
      console.error("Database check failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      {status === "checking" && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Checking database...</span>
        </>
      )}
      {status === "connected" && (
        <>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-muted-foreground">
            Connected • {count} cards registered
          </span>
        </>
      )}
      {status === "error" && (
        <>
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-red-500">Database offline</span>
        </>
      )}
    </div>
  );
};
