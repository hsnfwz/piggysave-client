import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  // Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';

import { useEffect, useState } from 'react';

import { getChartYMax } from '../services/helpers';

function CustomLineChart({ data, syncId, lineColor }: any) {
  const [yMax, setYMax] = useState('auto');

  useEffect(() => {
    if (data.length > 0) {
      let max: any = getChartYMax(data);
      setYMax(max);
    }
  }, [data]);

  // function renderLegend(props) {
  //   const { payload } = props;

  //   // console.log(payload)

  //   return (
  //     <ul className="flex justify-center items-center gap-4 p-2">
  //       {payload.map((entry, index) => (
  //         <li key={`item-${index}`} className="flex justify-center items-center gap-2">
  //           <span className={`w-[16px] h-[16px] rounded`} style={{ backgroundColor: `${entry.color}` }} ></span>
  //           <span className="text-white capitalize">{entry.value}</span>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  function renderTooltip(props: any) {
    const { active, payload, label } = props;

    // console.log(active, payload, label);

    if (active && payload && payload.length) {
      return (
        <div className="border border-slate-700 bg-slate-800 rounded text-white p-2">
          <p>{label}</p>
          <p style={{ color: lineColor }}>{payload[0].value}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        // margin={{
        //   top: 0,
        //   left: 10,
        //   bottom: 16,
        //   right: 0
        // }}
        margin={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        syncId={syncId}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={lineColor}
          fill={lineColor}
          fillOpacity="0.25"
        />
        <XAxis
          dataKey="time"
          stroke="white"
          axisLine={{ stroke: lineColor }}
          // label={{ value: 'Month', position: 'bottom', offset: 0, fill: 'white' }}
        />
        <YAxis
          stroke="white"
          axisLine={{ stroke: lineColor }}
          type="number"
          domain={[0, yMax]}
          // allowDataOverflow={false}
          // label={{ value: 'Amount', angle: -90, position: 'left', offset: 0, fill: 'white' }}
        />
        {/* <Legend
          verticalAlign="top"
          align="center"
          content={renderLegend}
        /> */}
        <Tooltip cursor={false} content={renderTooltip} />
        <Line
          dataKey="amount"
          fill={lineColor}
          // label={{ fill: 'white', fontSize: 12 }}
          activeDot={{ stroke: 'white', strokeWidth: 1 }}
          dot={{ stroke: lineColor, strokeWidth: 1 }}
          stroke={lineColor}
          strokeWidth={1}
          // barSize={20}
          // background={{ fill: 'yellow' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CustomLineChart;
