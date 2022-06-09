import { collection, getDocs } from "firebase/firestore";
import { useAppStore } from "../context/AppContext"
import { db } from "../firebaseSetup";
import { Data, Fart, Maling, Measurement, Puls } from "../Models/maling";

export default () => {
    const { user, setMeasurements } = useAppStore();

    const getLaktat = async () => {
        if (!user) return;

        const data = await getDocs(collection(db, "laktat", user.uid, "malinger"));

        const measurements = data.docs.flatMap(doc => {
            const laktat = doc.data();

            return laktat.data.map((l: any) => {
                const measurement: Measurement = {
                    verdi: l.verdi,
                    fart: l.fart,
                    puls: l.puls
                }
                return measurement;
            });
        });
        setMeasurements([...measurements]);
    }

    return { getLaktat }
}