import { Table, Button } from "react-bootstrap";
import useGetLaktat from "../../api/useGetLaktat";
import { useAppStore } from "../../context/AppContext";
import { Measurement } from "../../Models/maling";
import { prettifyDate } from "../../utils/DateUtils";
import { Wrapper } from "./MeasurementList.style";

type Props = {

}

const MeasurementsListComponent: React.FC<Props> = () => {
    const { measurements, setMeasurements, setSelectedMeasurement } = useAppStore();
    const { removeMeasurement } = useGetLaktat();

    const onRemoveMeasurementClick = (measurement: Measurement, index: number) => {
        measurements.splice(index, 1);
        setMeasurements([...measurements]);
        removeMeasurement(measurement)
    }
    return (
        <>
            <Wrapper>
                <Table>
                    <thead>
                        <tr>
                            <th>Dato</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {measurements.map((measurement, i) =>
                            <tr key={`measurement_row_${i}`} onClick={() => setSelectedMeasurement({ ...measurement })} title="Velg">
                                <td>{prettifyDate(measurement.date)}</td>
                                <td><Button onClick={() => onRemoveMeasurementClick(measurement, i)}>Delete</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Wrapper>
        </>
    );
}

export default MeasurementsListComponent;