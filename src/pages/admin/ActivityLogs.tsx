import {
  getActivityLogs,
} from "../../utils/activityLog";

export default function ActivityLogs() {
  const logs =
    getActivityLogs();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Activity Logs
      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        {logs.length === 0 ? (
          <p className="text-gray-500">
            No activity yet
          </p>
        ) : (
          <div className="space-y-4">

            {logs.map(
              (log: any) => (
                <div
                  key={log.id}
                  className="
                    border-b
                    pb-4
                  "
                >
                  <h3 className="font-semibold">
                    {log.action}
                  </h3>

                  {log.vehicle && (
                    <p className="text-gray-600">
                      {log.vehicle}
                    </p>
                  )}

                  <p className="text-sm text-gray-400">
                    {log.date}
                  </p>
                </div>
              )
            )}

          </div>
        )}

      </div>

    </div>
  );
}