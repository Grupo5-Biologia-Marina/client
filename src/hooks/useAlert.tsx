import { useState } from "react";

export type AlertType = "success" | "error" | "info" | "warning";

export interface AlertMessage {
  message: string;
  type: AlertType;
  icon?: string; // ruta personalizada opcional
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertMessage | null>(null);

  // Muestra el alert
  const showAlert = (
    message: string,
    type: AlertType = "info",
    icon?: string
  ) => {
    setAlert({ message, type, icon });

    // 🔥 Cierre automático a los 4s (para UX más fluida)
    setTimeout(() => setAlert(null), 4000);
  };

  // Permite cerrarlo manualmente también
  const closeAlert = () => setAlert(null);

  return { alert, showAlert, closeAlert };
};
