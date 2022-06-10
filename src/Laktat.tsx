import { FC, ReactElement } from "react";
import { Measurement } from "./Models/maling";
import { Button } from "react-bootstrap";
import { useAppStore } from "./context/AppContext";
import LaktatOverviewComponent from "./Components/laktat-overview/LaktatOverview";
import { MeasurementHeader, Wrapper } from "./Laktat.style";
import { prettifyDate } from "./utils/DateUtils";
import moment from "moment";
import LaktatListComponent from "./Components/laktat-list/LaktatList";
import MeasurementsListComponent from "./Components/measurements-list/MeasurementList";

const Laktat: FC = (): ReactElement => {
    const { selectedMeasurement, setSelectedMeasurement } = useAppStore();

    const onNewMeasurementClick = () => {
        const measurement: Measurement = {
            date: moment().toDate(),
            laktater: []
        }
        setSelectedMeasurement({ ...measurement });
    }

    return (
        <>
            <Wrapper>
                <div>
                    {selectedMeasurement && <LaktatOverviewComponent selectedMeasurement={selectedMeasurement}></LaktatOverviewComponent>}
                </div>
                {selectedMeasurement &&
                    <div>
                        <MeasurementHeader>
                            <Button onClick={() => setSelectedMeasurement(null)}>Tilbake</Button>
                            {prettifyDate(selectedMeasurement.date)}
                        </MeasurementHeader>
                        <LaktatListComponent />
                    </div>
                }
                {!selectedMeasurement &&
                    <div>
                        <MeasurementHeader>
                            Målinger
                            <Button onClick={onNewMeasurementClick}>Ny måling</Button>
                        </MeasurementHeader>
                        <MeasurementsListComponent />
                    </div>
                }
            </Wrapper>
        </>
    );
};

export default Laktat;
