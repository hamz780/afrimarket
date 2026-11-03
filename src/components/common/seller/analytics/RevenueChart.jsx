import "./Analytics.css";

const revenueData = [
  { month: "Jan", revenue: 18000 },
  { month: "Feb", revenue: 24000 },
  { month: "Mar", revenue: 21000 },
  { month: "Apr", revenue: 28500 },
  { month: "May", revenue: 34000 },
  { month: "Jun", revenue: 39000 },
  { month: "Jul", revenue: 46000 },
];

export default function RevenueChart() {

  const maxRevenue = Math.max(
    ...revenueData.map(item => item.revenue)
  );

  return (

    <div className="analytics-panel">

      <div className="panel-header">

        <h3>💰 Revenue Growth</h3>

        <span>This Year</span>

      </div>

      <div className="line-chart">

        <div className="line-points">

          {revenueData.map((item) => (

            <div
              className="line-point-wrapper"
              key={item.month}
            >

              <div
                className="line-point"
                style={{
                  bottom: `${(item.revenue / maxRevenue) * 180}px`
                }}
              />

              <span className="line-value">
                ${item.revenue.toLocaleString()}
              </span>

              <small>{item.month}</small>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}