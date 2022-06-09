import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Line, LabelList } from 'recharts';
import styled from 'styled-components';

type LaktatChartProps = {
    data: any[],
    syncId: string,
    xKey: string,
    lineKey: string,
    xDomain: number[],
    yDomain: number[],
};

const LaktatChart: React.FC<LaktatChartProps> = ({ data, syncId, xKey, lineKey, xDomain, yDomain }) => (
    <div>
        <LineChart width={700} height={400} data={data} syncId={syncId}>
            <CartesianGrid stroke="#f5f5f5" fill="#e6e6e6" />
            <XAxis type="number" dataKey={xKey} height={40} startOffset="4" tickCount={8} domain={xDomain} />
            <YAxis type="number" width={80} domain={yDomain} />
            <Tooltip />
            <ReferenceLine y={4} stroke="green" />
            <Line
                key="uv"
                type="monotone"
                dataKey={lineKey}
                stroke="#ff7300"
                strokeOpacity="1"
                strokeDasharray="3 3"
            >
                <LabelList position="bottom" offset={10} dataKey={lineKey} />
            </Line>
        </LineChart>
    </div>);

export default styled(LaktatChart)``;