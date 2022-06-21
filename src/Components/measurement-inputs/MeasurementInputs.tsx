import { DatePicker, Input } from "antd";
import moment from "moment";
import { useState } from "react";
import { LaktatType, Measurement } from "../../Models/maling";
import { InputLabel, InputRow, Wrapper } from "./MeasurementInputs.style";

type Props = {
}

const initMeasurement: Measurement = {
    date: moment().toDate(),
    laktater: []
}

const initLaktat: LaktatType = {
    fart: 0,
    laktat: 0,
    puls: 0
}

const MeasurementInputsComponent: React.FC<Props> = (props) => {
    const [measurement, setMeasurement] = useState<Measurement>(initMeasurement);
    const [inputLaktat, setInputLaktat] = useState<LaktatType>(initLaktat);
    
    const onDateChange = (date: moment.Moment | null, dateString: string) => {
        if (date && measurement) {
            measurement.date = date.toDate();
            setMeasurement({ ...measurement });
        }
    };

    return (
        <Wrapper>
            <InputRow>
                <InputLabel>Dato</InputLabel>
                <DatePicker
                    format={'DD.MM.YYYY'}
                    clearIcon={false}
                    value={moment(measurement.date)}
                    placeholder={''}
                    onChange={onDateChange}
                />
            </InputRow>
            <InputRow>
                <InputLabel>Fart</InputLabel>
                <Input type={'number'} placeholder={'Fart'} value={inputLaktat.fart}/>
            </InputRow>
            <InputRow>
                <InputLabel>Puls</InputLabel>
                <Input type={'number'} placeholder={'Puls'} value={inputLaktat.puls}/>
            </InputRow>
            <InputRow>
                <InputLabel>Laktat</InputLabel>
                <Input type={'number'} placeholder={'Laktat'} value={inputLaktat.laktat}/>
            </InputRow>
            <button>Legg til</button>
        </Wrapper>
    );
}

export default MeasurementInputsComponent;