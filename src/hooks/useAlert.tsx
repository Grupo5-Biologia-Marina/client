import { useState } from "react";

export type AlertType = "success" | "error" | "info" | "warning";

export interface AlertMessage {
  message: string;
  type: AlertType;
  icon?: string; 
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertMessage | null>(null);

  const showAlert = (
    message: string,
    type: AlertType = "info",
    icon?: string
  ) => {
    setAlert({ message, type, icon });

    setTimeout(() => setAlert(null), 4000);
  };

  const closeAlert = () => setAlert(null);

  return { alert, showAlert, closeAlert };
};
