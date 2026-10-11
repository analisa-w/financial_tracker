import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

// Define your data structure
const data = [
  { name: 'Jan', sales: 4000},
  { name: 'Feb', sales: 3000},
  { name: 'Mar', sales: 2000},
  { name: 'Apr', sales: 2780},
  { name: 'May', sales: 1890},
  { name: 'Jun', sales: 2390},
];

export default function LineChartCard() {
    return (
    <LineChart
      style={{ width: '100%', maxWidth: '700px', height: '90%', maxHeight: '90vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 20,
        left: 40,
        bottom: 20,
      }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="var(--color-black)" >
            <Label value="Month" offset={-30} position="insideBottom" />
        </XAxis>

        <YAxis dataKey= "sales" width="auto" stroke="var(--color-black)" >
            <Label value="Amount ($)" angle = {-90} position="insideLeft" textAnchor='middle' offset = {-20} />
        </YAxis>
        

        <Tooltip
        cursor={{
            stroke: 'var(--color-navy)',
        }}
        contentStyle={{
            backgroundColor: 'var(--color-lightblue)',
            borderColor: 'var(--color-navy)',
        }}
        />
        <Legend />
        <Line
        type="monotone"
        dataKey="sales"
        stroke="var(--color-pink)"
        dot={{
            fill: 'var(--color-pink)',
        }}
        activeDot={{ r: 8, stroke: 'var(--color-pink)' }}
        />
    </LineChart>
    );
}