import moment from "moment";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LaktatListComponent from "../../Components/laktat-list/LaktatList";
import MeasurementInputsComponent from "../../Components/measurement-inputs/MeasurementInputs";
import { useAppStore } from "../../context/AppContext";
import { Measurement } from "../../Models/maling";

type Props = {}

const MeasurementPage: React.FC<Props> = (props) => {
    const { selectedMeasurement, setSelectedMeasurement } = useAppStore();
    const location = useLocation();

    useEffect(() => {
        console.log('init')
    }, [location])

    const onNewMeasurementLoad = () => {
        const measurement: Measurement = {
            date: moment().toDate(),
            laktater: []
        }
        setSelectedMeasurement({ ...measurement });
    }
    return (
        <>
            <MeasurementInputsComponent></MeasurementInputsComponent>
        </>
    );
}

export default MeasurementPage;