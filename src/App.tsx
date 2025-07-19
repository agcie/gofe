import { useState, useEffect } from "react";

const LedStatusMonitor = () => {
  const [ledStatus, setLedStatus] = useState({
    red: "off",
    blue: "off",
    green: "off",
  });

  const fetchLedStatus = async (color: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/led/${color}`
      );
      const status = await response.text();
      return status;
    } catch {
      return "error";
    }
  };

  const fetchAllLedStatuses = async () => {
    const red = await fetchLedStatus("red");
    const blue = await fetchLedStatus("blue");
    const green = await fetchLedStatus("green");

    setLedStatus({ red, blue, green });
  };

  useEffect(() => {
    fetchAllLedStatuses();
    const interval = setInterval(fetchAllLedStatuses, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#181A20",
      }}
    >
      <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
        {/* Blue LED */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: ledStatus.blue.includes("on") ? "#3498ff" : "#22334a",
            boxShadow: ledStatus.blue.includes("on")
              ? "0 0 32px 8px #3498ff88"
              : "0 0 8px 2px #22334a55",
            border: "2px solid #3498ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>

        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: ledStatus.red.includes("on") ? "#ff3b3b" : "#3a2323",
            boxShadow: ledStatus.red.includes("on")
              ? "0 0 32px 8px #ff3b3b88"
              : "0 0 8px 2px #3a232355",
            border: "2px solid #ff3b3b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LedStatusMonitor;
