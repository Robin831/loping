import { FC, ReactElement } from "react";
import { Measurement } from "../../Models/maling";
import { Button } from "react-bootstrap";
import { useAppStore } from "../../context/AppContext";
import LaktatOverviewComponent from "../laktat-overview/LaktatOverview";
import { MeasurementHeader } from "../../Laktat.style";
import { prettifyDate } from "../../utils/DateUtils";
import moment from "moment";
import LaktatListComponent from "../laktat-list/LaktatList";
import MeasurementsListComponent from "../measurements-list/MeasurementList";
import { useResponsiveHandler } from "../../hooks/useResponsiveHandler";
import { ListLink, Wrapper } from "./LaktatMobile.style";

const LaktatMobile: FC = (): ReactElement => {
    return (
        <>
            <Wrapper>
                <ListLink to={'/measurement'}><h4>Ny måling</h4></ListLink>
                <ListLink to={'/measurement'}><h4>Historikk</h4></ListLink>
            </Wrapper>
        </>
    );
};

export default LaktatMobile;
