import { FC, ReactElement, useEffect, useState } from "react";
import { db, auth, provider } from "./firebaseSetup"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { signInWithRedirect } from "firebase/auth";
import LaktatChart from "./Components/LaktatChart";
import { Data, Fart, Maling, Puls } from "./Models/maling";
import styled from 'styled-components';
import { Button } from "react-bootstrap";
import { useAppStore } from "./context/AppContext";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;

const DataContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
    row-gap: 10px;
    column-gap: 2em;
`;

const HeaderWrapper = styled.div`
    display: grid;
    grid-template-columns: 200px 200px 200px;
    column-gap: 10px;
`;

const Laktat: FC = (): ReactElement => {
    const { user } = useAppStore();
    const [bruker, setBruker] = useState<string | null | undefined>(auth.currentUser?.uid);
    const [malinger, setMalinger] = useState<Maling[]>([]);

    useEffect(() => {
        if (!user) return;

        fetchData();
    }, [user])


    const fetchData = async () => {
        if (bruker) {
            const data = await getDocs(collection(db, "laktat", bruker, "malinger"));

            let malingList: Maling[] = [];

            data.forEach((doc) => {
                let laktat = doc.data();
                let maling = new Maling();
                maling.id = doc.id;

                laktat.data.forEach((l: any) => {

                    let puls = new Puls();
                    let fart = new Fart();
                    let d = new Data();

                    puls.laktat = l.verdi;
                    fart.laktat = l.verdi;
                    puls.puls = l.puls;
                    fart.fart = l.fart;
                    d.laktat = l.verdi;
                    d.fart = l.fart;
                    d.puls = l.puls;


                    maling.pulsDataMalinger.push(puls);
                    maling.fartDataMalinger.push(fart);
                    maling.malinger.push(d);
                });

                malingList.push(maling);

            });

            setMalinger(malingList);
        }

    }

    const oppdater = async () => {
        malinger.forEach(m => {
            // const malingRef = doc(db, 'malinger', m.id);
            const malingData = malinger.find(x => x.id === m.id);

            if (malingData) {
                console.log(malingData.malinger);
                // await setDoc(malingRef, malingData.malinger)
            }
        })


    }

    const setData = async () => {
        if (bruker) {
            await addDoc(collection(db, "laktat", bruker, "malinger"),
                {
                    data: [
                        {
                            fart: 13,
                            puls: 140,
                            verdi: 5.3,
                        },
                        {
                            fart: 14,
                            puls: 150,
                            verdi: 6.3,
                        }

                    ]
                });
        }
    }

    return (
        <header className="App-header">
            {bruker &&
                <>
                    <p>Terskel</p>
                    <Button variant="primary" onClick={fetchData}>Hent data</Button>
                    <Button variant="primary" onClick={setData}>Sett data</Button>
                    <Container>
                        {malinger.length > 0 && malinger.map(ma => (
                            <LaktatChart
                                data={ma.fartDataMalinger}
                                syncId={ma.id}
                                xKey="fart"
                                lineKey="laktat"
                                xDomain={[11, 15]}
                                yDomain={[1, 8]}
                            />
                        ))}
                    </Container>
                    <Container>
                        {malinger.length > 0 && malinger.map(ma => (
                            <LaktatChart
                                data={ma.pulsDataMalinger}
                                syncId={ma.id + 'puls'}
                                xKey="puls"
                                lineKey="laktat"
                                xDomain={[130, 190]}
                                yDomain={[1, 8]}
                            />
                        ))}
                    </Container>
                    <h3>Data</h3>
                    <DataContainer>
                        {malinger.length > 0 && malinger.map(ma => (
                            <>
                                <h4>{ma.id}</h4>
                                <HeaderWrapper>
                                    <h6>Fart</h6>
                                    <h6>Puls</h6>
                                    <h6>Laktat</h6>
                                </HeaderWrapper>
                                <HeaderWrapper>
                                    {ma.malinger.map(f => (
                                        <>
                                            <input type="number" value={f.fart} />
                                            <input type="number" value={f.puls} />
                                            <input type="number" value={f.laktat} />
                                        </>
                                    ))}

                                </HeaderWrapper>
                            </>
                        ))}
                    </DataContainer>
                    <Button variant="primary" onClick={oppdater}>Oppdater</Button>

                </>
            }
        </header>
    );
};

export default Laktat;
