// src/middleware/logger.js
export const logEvent = (event) => {
  const log = {
    timestamp: new Date().toISOString(),
    event,
  };
  // Store logs locally
  let logs = JSON.parse(localStorage.getItem("logs") || "[]");
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
};
