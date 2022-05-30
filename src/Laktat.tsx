import { FC, ReactElement } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Line, LabelList } from "recharts";

const data = [
    { fart: '11', laktat: 1.4 },
    { fart: '12', laktat: 3.1 },
    { fart: '13', laktat: 3.5 },
    { fart: '14', laktat: 7.1 },
  ];
  
  const dataPuls = [
    { puls: '140', laktat: 1.4 },
    { puls: '150', laktat: 3.1 },
    { puls: '161', laktat: 3.5 },
    { puls: '170', laktat: 7.1 },
  ];
  
  
  const initialState = {
    data,
    opacity: 1,
    anotherState: false,
  };

const Laktat: FC = (): ReactElement =>  {
    const state: any = initialState;
    const { data, opacity } = state;
  
    return (
        <header className="App-header">
            <p>Terskel</p>
            <div>
                <p>Laktat over km/t</p>
                <div className="line-chart-wrapper">
                    <LineChart width={700} height={400} data={data} syncId="test">
                    <CartesianGrid stroke="#f5f5f5" fill="#e6e6e6" />
                    <XAxis type="number" dataKey="fart" height={40} startOffset="4" tickCount={8} domain={[11, 15]} />
                    <YAxis type="number" width={80} domain={[1, 8]} />
                    <Tooltip  />
                    <ReferenceLine y={4} stroke="green"/>
                    <Line
                        key="uv"
                        type="monotone"
                        dataKey="laktat"
                        stroke="#ff7300"
                        strokeOpacity={opacity}
                        strokeDasharray="3 3"
                    >
                        <LabelList position="bottom" offset={10} dataKey="laktat" />
                    </Line>
                    </LineChart>
                </div>
            </div>

            <div>
                <p>Laktat over puls</p>
                <div className="line-chart-wrapper">
                    <LineChart width={700} height={400} data={dataPuls} syncId="test">
                    <CartesianGrid stroke="#f5f5f5" fill="#e6e6e6" />
                    <XAxis type="number" dataKey="puls" height={40}  tickCount={12} domain={[130, 190]} />
                    <YAxis type="number" width={80} domain={[1, 8]} />
                    <Tooltip  />
                    <ReferenceLine y={4} stroke="green"/>
                    <Line
                        key="uv"
                        type="monotone"
                        dataKey="laktat"
                        stroke="#ff7300"
                        strokeOpacity={opacity}
                        strokeDasharray="3 3"
                    >
                        <LabelList position="bottom" offset={10} dataKey="laktat" />
                    </Line>
                    </LineChart>
                </div>
            </div>
        </header>
    );
};

export default Laktat;
