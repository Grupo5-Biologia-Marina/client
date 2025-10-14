import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface AlertData {
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface AlertContextProps {
  showAlert: (message: string, type?: "success" | "error" | "info" | "warning") => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertContext debe usarse dentro de un AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const showAlert = (message: string, type: "success" | "error" | "info" | "warning" = "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3500);
  };

  const backgroundImages: Record<string, string> = {
    success: "url('/src/assets/icons/success.png')",
    error: "url('/src/assets/icons/error.png')",
    info: "url('/src/assets/icons/info.png')",
    warning: "url('/src/assets/icons/warning.png')",
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert && (
        <div
          className={`alert ${alert.type}`}
          style={{
            position: "fixed",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(90%, 500px)",
            minHeight: "110px",
            padding: "1.5rem 2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "white",
            borderRadius: "20px",
            backgroundImage:
              backgroundImages[alert.type] || "url('/src/assets/icons/alert.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            border:
              alert.type === "success"
                ? "3px solid #00b894"
                : alert.type === "error"
                ? "3px solid #e74c3c"
                : alert.type === "warning"
                ? "3px solid #f1c40f"
                : "3px solid rgba(255,255,255,0.3)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {/* Overlay para oscurecer un poco el fondo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: "20px",
            }}
          />
          <p style={{ position: "relative", zIndex: 2 }}>{alert.message}</p>
        </div>
      )}
    </AlertContext.Provider>
  );
};
