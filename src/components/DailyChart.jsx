import "./DailyChart.css";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useDailyChart from "../hooks/useDailyChart";

const getBarColor = (sessions) => {
  if (sessions >= 8) return "#ec4899";
  if (sessions >= 5) return "#a855f7";
  if (sessions > 0) return "#67e8f9";
  return "rgba(139, 92, 246, 0.16)";
};

function DailyChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;

  return (
    <div className="chart-tooltip">
      <div className="tooltip-label">{label}</div>
      <div className="tooltip-value">{value} sessions</div>
      <div className="tooltip-muted">{value * 25} minutes focused</div>
    </div>
  );
}

export default function DailyChart() {
  const { data } = useDailyChart();
  const totalSessions = data.reduce((total, day) => total + day.sessions, 0);

  return (
    <div className="card daily-chart-card">
      <div className="chart-header">
        <div>
          <div className="chart-title">Daily Focus Sessions</div>
          <div className="chart-subtitle">Pomodoros completed per day</div>
        </div>
        <div className="chart-summary">
          <span>{totalSessions}</span>
          <small>this month</small>
        </div>
      </div>

      <div className="daily-chart-shell">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid
                stroke="rgba(139, 92, 246, 0.12)"
                strokeDasharray="4 8"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8b95a5", fontSize: 11 }}
                interval="preserveStartEnd"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                tick={{ fill: "#6b7280", fontSize: 11 }}
              />
              <Tooltip cursor={{ fill: "rgba(139, 92, 246, 0.08)" }} content={<DailyChartTooltip />} />
              <Bar dataKey="sessions" radius={[10, 10, 4, 4]} maxBarSize={34}>
                {data.map((entry) => (
                  <Cell key={entry.date} fill={getBarColor(entry.sessions)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="chart-empty-state">No sessions logged yet this month.</div>
        )}
      </div>
    </div>
  );
}
