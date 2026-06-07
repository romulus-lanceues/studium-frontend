import "./BySubjectChart.css";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import useBySubjectChart from "../hooks/useBySubjectChart.js";

function SubjectTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const subject = payload[0].payload;

  return (
    <div className="chart-tooltip">
      <div className="tooltip-label">{subject.name}</div>
      <div className="tooltip-value">{subject.sessions} sessions</div>
    </div>
  );
}

export default function BySubjectChart() {
  const { data } = useBySubjectChart();
  const totalSessions = data.reduce((total, subject) => total + subject.sessions, 0);
  const topSubjects = [...data].sort((a, b) => b.sessions - a.sessions).slice(0, 4);

  return (
    <div className="card category-chart-card">
      <div className="subject-chart-header">
        <div className="chart-title">Monthly Session Distribution</div>
        <span className="chart-badge">{data.length} subjects</span>
      </div>

      <div className="subject-chart-content">
        <div className="donut-wrapper">
          {data.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<SubjectTooltip />} />
                  <Pie
                    data={data}
                    dataKey="sessions"
                    nameKey="name"
                    innerRadius="68%"
                    outerRadius="92%"
                    paddingAngle={3}
                    cornerRadius={8}
                    stroke="rgba(20, 16, 29, 0.96)"
                    strokeWidth={4}
                  >
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={entry.color || "#a855f7"} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="donut-center">
                <span>{totalSessions}</span>
                <small>sessions</small>
              </div>
            </>
          ) : (
            <div className="chart-empty-state">No subject data yet.</div>
          )}
        </div>

        {topSubjects.length > 0 && (
          <div className="subject-list">
            {topSubjects.map((subject) => {
              const percentage =
                totalSessions > 0 ? Math.round((subject.sessions / totalSessions) * 100) : 0;

              return (
                <div className="subject-row" key={subject.name}>
                  <div className="subject-row-header">
                    <span className="subject-name">
                      <span
                        className="subject-dot"
                        style={{ backgroundColor: subject.color || "#a855f7" }}
                      />
                      {subject.name}
                    </span>
                    <span className="subject-percent">{percentage}%</span>
                  </div>
                  <div className="subject-progress">
                    <span
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: subject.color || "#a855f7",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
