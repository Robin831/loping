import { useAppStore } from "../../context/AppContext";
import { Measurement } from "../../Models/maling";
import ComposedChart from "../ComposedChart";
import LaktatChart from "../LaktatChart";
import { Wrapper } from "./LaktatOverview.style";

type Props = {
    selectedMeasurement: Measurement
}

const LaktatOverviewComponent: React.FC<Props> = (props) => {
    const { measurements } = useAppStore();

    return (
        <>
            <Wrapper>
                <LaktatChart
                    data={props.selectedMeasurement.laktater}
                    syncId={'fart'}
                    xKey="fart"
                    lineKey="laktat"
                    xDomain={[11, 15]}
                    yDomain={[1, 8]}
                />
                {/* <ComposedChart
                    data={props.selectedMeasurement.laktater}
                    syncId={'fart'}
                    xKey="fart"
                    lineKey="laktat"
                    xDomain={[11, 15]}
                    yDomain={[1, 8]}
                /> */}
            </Wrapper>
        </>
    );
}

export default LaktatOverviewComponent;