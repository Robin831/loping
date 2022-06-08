import { FC, ReactElement, useState } from "react";
import {  db, auth, provider } from "./firebaseSetup"
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { signInWithPopup } from "firebase/auth";
import LaktatChart from "./Components/LaktatChart";
import { Fart, Maling, Puls } from "./Models/maling";
import styled from 'styled-components';

const dataPuls = [
    { puls: '140', laktat: 1.4 },
    { puls: '150', laktat: 3.1 },
    { puls: '161', laktat: 3.5 },
    { puls: '170', laktat: 7.1 },
  ];

  
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;

const Laktat: FC = (): ReactElement =>  {
    const [bruker, setBruker] = useState<string | null | undefined>(auth.currentUser?.uid);
    const [lineData, setLineData] = useState<any[]>([]);
    const [malinger, setMalinger] = useState<Maling[]>([]);

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        setBruker(user.uid);
      }
    
    const fetchData = async () => {
        if (bruker)
        {
            const data = await getDocs(collection(db, "laktat", bruker, "malinger"));
   
            let malingList: Maling[] = [];

            data.forEach((doc) => {
                let laktat = doc.data();
                let maling = new Maling();
                maling.id = doc.id;
                

                let d: any[] = [];                

                laktat.data.forEach((l: any) => {
                    let data = {
                        fart: l.fart,
                        laktat: l.verdi
                    }
                    d.push(data);
                    
                    let puls = new Puls();
                    let fart = new Fart();

                    puls.laktat = l.verdi;
                    fart.laktat = l.verdi;
                    puls.puls = l.puls;
                    fart.fart = l.fart;

                    maling.pulsDataMalinger.push(puls);
                    maling.fartDataMalinger.push(fart);                    
                });

                malingList.push(maling);

                if (lineData.length === 0) {
                    setLineData(d);

                }
            });

            setMalinger(malingList);
        }
        
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
        {!bruker && 
            <button onClick={googleSignIn}>Sign in with Google</button>
        }
        {bruker && 
            <>
            <p>Terskel</p>
            <button onClick={fetchData}>Hent data</button>
            <button onClick={setData}>Sett data</button>
            <Container>
                    {malinger.length > 0 && malinger.map( ma => (
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
                    {malinger.length > 0 && malinger.map( ma => (
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
            </>
        }
        </header>
    );
};

export default Laktat;
