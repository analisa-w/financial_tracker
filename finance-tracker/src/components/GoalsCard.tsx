import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';


const goals = [
  { title: 'New Airpods', target: 250, saved: 25, savedColor: 'var(--color-navy)', remainingColor: 'var(--color-lightblue)'},
  { title: 'Emergency Fund', target: 10000, saved: 3000, savedColor: 'var(--color-yellow)', remainingColor: 'var(--color-lightyellow)'},
  { title: 'Europe Trip', target: 5000, saved: 475, savedColor: 'var(--color-darkgreen)', remainingColor: 'var(--color-green)' },
  { title: 'New Laptop', target: 2000, saved: 800, savedColor: 'var(--color-darkpink)', remainingColor: 'var(--color-pink)'},
]


export default function GoalsCard() {
  return (
    <div className="goals-grid">
      {goals.map((goal, index) => {
        const pieData = [
          { name: 'Saved', value: goal.saved, fill: goal.savedColor},
          { name: 'Remaining', value: goal.target - goal.saved, fill: goal.remainingColor},
        ]
        return (
          <div key={index} style={{ width: '100%', height: 186 }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <h3>{goal.title}</h3>
                <h4>{(goal.saved / goal.target) * 100}%</h4>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={50}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )
      })}
    </div>
  )
}