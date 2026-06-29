export const getActivityLogs = () => {
  const data =
    localStorage.getItem(
      "carconnect-activity-logs"
    );

  return data
    ? JSON.parse(data)
    : [];
};

export const addActivityLog = (
  action: string,
  vehicle?: string
) => {
  const logs =
    getActivityLogs();

  logs.unshift({
    id: Date.now(),
    action,
    vehicle,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem(
    "carconnect-activity-logs",
    JSON.stringify(logs)
  );
};