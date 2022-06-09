import { DatePicker } from "antd";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import { Button, Table } from "react-bootstrap";
import useGetLaktat from "../../api/useGetLaktat";
import { useAppStore } from "../../context/AppContext";
import { LaktatType, Measurement } from "../../Models/maling";
import { prettifyDate } from "../../utils/DateUtils";
import { Wrapper } from "./LaktatList.style";

type Props = {

}

const LaktatListComponent: React.FC<Props> = (props) => {
    const { selectedMeasurement, setSelectedMeasurement } = useAppStore();
    const { updateMeasurement, addMeasurement } = useGetLaktat();
    const [newLaktat, setNewLaktat] = useState<LaktatType>({ laktat: 0, puls: 0, fart: 0 });

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

    return (
        <>
            {selectedMeasurement && <Wrapper>
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
            </Wrapper>
            }
        </>
    );
}

export default LaktatListComponent;