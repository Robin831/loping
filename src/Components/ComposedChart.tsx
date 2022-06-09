import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Line, LabelList, ComposedChart, Legend, Area, Bar } from 'recharts';
import styled from 'styled-components';

type LaktatChartProps = {
    data: any[],
    syncId: string,
    xKey: string,
    lineKey: string,
    xDomain: number[],
    yDomain: number[],
};

const ComposedChartComponent: React.FC<LaktatChartProps> = ({ data, syncId, xKey, lineKey, xDomain, yDomain }) => (
    <div>
        <ComposedChart width={730} height={250} data={data} syncId={syncId}>
            <XAxis type="number" dataKey={xKey} startOffset="4" tickCount={8} domain={xDomain} />
            <YAxis type="number" width={80} domain={yDomain} />
            <Tooltip />
            <Legend />
            <CartesianGrid stroke="#f5f5f5" />
            <Line type="monotone" dataKey="laktat" stroke="#8884d8" />
            <Line type="monotone" dataKey="puls" stroke="#ff7300" />
        </ComposedChart>
    </div>);

export default styled(ComposedChartComponent)``;