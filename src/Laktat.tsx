import { ChangeEvent, FC, ReactElement, useState } from "react";
import { LaktatType, Measurement } from "./Models/maling";
import { Button, Table } from "react-bootstrap";
import { useAppStore } from "./context/AppContext";
import useGetLaktat from "./api/useGetLaktat";
import LaktatOverviewComponent from "./Components/laktat-overview/LaktatOverview";
import { MeasurementHeader, Wrapper } from "./Laktat.style";
import { prettifyDate } from "./utils/DateUtils";
import { DatePicker } from "antd";
import moment from "moment";

const Laktat: FC = (): ReactElement => {
    const { measurements, setMeasurements } = useAppStore();
    const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement>();
    const [newLaktat, setNewLaktat] = useState<LaktatType>({ laktat: 0, puls: 0, fart: 0 });
    const { updateMeasurement, addMeasurement, removeMeasurement } = useGetLaktat();

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        const name = event.target.name;
        let laktat = { ...newLaktat };

        if (name === 'laktat') laktat.laktat = value;
        if (name === 'fart') laktat.fart = value;
        if (name === 'puls') laktat.puls = value;

        setNewLaktat({ ...laktat });
    }

    const onDateChange = (date: moment.Moment | null, dateString: string) => {
        if (date && selectedMeasurement) {
            selectedMeasurement.date = date.toDate();
            setSelectedMeasurement({ ...selectedMeasurement });
        }
    };

    const onNewMeasurementClick = () => {
        const measurement: Measurement = {
            date: moment().toDate(),
            laktater: []
        }
        setSelectedMeasurement({ ...measurement });
    }

    const onAddMeasurementClick = async (measurement: Measurement) => {
        measurement.laktater.push(newLaktat);
        const updatedMeasurement = await addMeasurement(measurement);

        if (updatedMeasurement) {
            setSelectedMeasurement({ ...updatedMeasurement });
        }
    }

    const onAddLaktatClick = (laktat: LaktatType) => {
        if (!selectedMeasurement) return;
        selectedMeasurement.laktater.push(laktat);
        setSelectedMeasurement({ ...selectedMeasurement })
        updateMeasurement(selectedMeasurement);
    }

    const onRemoveLaktatClick = (index: number) => {
        if (!selectedMeasurement) return;
        selectedMeasurement.laktater.splice(index, 1);
        setSelectedMeasurement({ ...selectedMeasurement });
        updateMeasurement(selectedMeasurement);
    }

    const onRemoveMeasurementClick = (measurement: Measurement, index: number) => {
        measurements.splice(index, 1);
        setMeasurements([...measurements]);
        removeMeasurement(measurement)
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
                            <Button onClick={() => setSelectedMeasurement(undefined)}>Tilbake</Button>
                            Laktat
                            {prettifyDate(selectedMeasurement.date)}
                        </MeasurementHeader>
                        <Table>
                            <thead>
                                <tr>
                                    {!selectedMeasurement.id && <th>Dato</th>}
                                    <th>Laktat</th>
                                    <th>Puls</th>
                                    <th>Fart</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {!selectedMeasurement.id &&
                                        <td>
                                            <DatePicker
                                                format={'DD.MM.YYYY'}
                                                clearIcon={false}
                                                value={moment(selectedMeasurement.date)}
                                                placeholder={''}
                                                onChange={onDateChange}
                                            />
                                        </td>
                                    }
                                    <td><input name={'laktat'} type={"number"} onChange={onInputChange} value={newLaktat.laktat}></input></td>
                                    <td><input name={'puls'} type={"number"} onChange={onInputChange} value={newLaktat.puls}></input></td>
                                    <td><input name={'fart'} type={"number"} onChange={onInputChange} value={newLaktat.fart}></input></td>
                                    {!selectedMeasurement.id && <td><Button onClick={() => onAddMeasurementClick(selectedMeasurement)}>Add</Button></td>}
                                    {selectedMeasurement.id && <td><Button onClick={() => onAddLaktatClick(newLaktat)}>Add</Button></td>}
                                </tr>
                                {selectedMeasurement.laktater.map((laktat, i) =>
                                    <tr key={`laktat_row_${i}`}>
                                        <td>{laktat.laktat}</td>
                                        <td>{laktat.puls}</td>
                                        <td>{laktat.fart}</td>
                                        <td><Button onClick={() => onRemoveLaktatClick(i)}>Delete</Button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                }
                {!selectedMeasurement &&
                    <div>
                        <MeasurementHeader>
                            Målinger
                            <Button onClick={onNewMeasurementClick}>Ny måling</Button>
                        </MeasurementHeader>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Dato</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {measurements.map((measurement, i) =>
                                    <tr key={`measurement_row_${i}`} onClick={() => setSelectedMeasurement({ ...measurement })}>
                                        <td>{prettifyDate(measurement.date)}</td>
                                        <td><Button onClick={() => onRemoveMeasurementClick(measurement, i)}>Delete</Button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>
                }
            </Wrapper>
        </>
    );
};

export default Laktat;
