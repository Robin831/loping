import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { useAppStore } from "../context/AppContext"
import { db } from "../firebaseSetup";
import { LaktatType, Measurement } from "../Models/maling";

export default () => {
    const { user, setMeasurements, measurements } = useAppStore();

    const getLaktat = async () => {
        if (!user) return;

        const data = await getDocs(collection(db, "laktat", user.uid, "malinger"));

        const measurements = data.docs.map(doc => {
            const data = doc.data();
            console.log(data, data.date.toDate())
            const laktater = data.data.map((l: any) => {
                const laktat: LaktatType = {
                    laktat: l.verdi,
                    fart: l.fart,
                    puls: l.puls,
                    id: doc.id
                }
                return laktat;
            });
            const mesurement: Measurement = {
                date: data.date.toDate(),
                id: doc.id,
                laktater
            }
            return mesurement;
        });
        setMeasurements([...measurements]);
    }

    const addMeasurement = async (measurement: Measurement) => {
        if (!user) return;
        const result = await addDoc(collection(db, "laktat", user.uid, "malinger"),
            {
                data: measurement.laktater.map(laktat => { return { fart: laktat.fart, puls: laktat.puls, verdi: laktat.laktat } }),
                date: measurement.date
            });

        measurement.id = result.id;
        measurements.push(measurement);
        setMeasurements([...measurements]);
        return { ...measurement };
    }

    const updateMeasurement = async (measurement: Measurement) => {
        if (!user) return;

        const data = {
            data: measurement.laktater.map(laktat => { return { fart: laktat.fart, puls: laktat.puls, verdi: laktat.laktat } }),
            date: measurement.date
        }
        await setDoc(doc(db, "laktat", user.uid, "malinger", measurement.id!), data)

    }

    const removeMeasurement = async (measurement: Measurement) => {
        if (!user) return;
        const malingRef = await doc(db, 'laktat', user.uid, "malinger", measurement.id!);
        await deleteDoc(malingRef);

    }

    return { getLaktat, updateMeasurement, addMeasurement, removeMeasurement }
}