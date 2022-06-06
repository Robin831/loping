import { FC, ReactElement, useEffect, useState } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Line, LabelList } from "recharts";
import {  db, auth, provider } from "./firebaseSetup"
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const dataPuls = [
    { puls: '140', laktat: 1.4 },
    { puls: '150', laktat: 3.1 },
    { puls: '161', laktat: 3.5 },
    { puls: '170', laktat: 7.1 },
  ];

const opacity = 1;  
  
const Laktat: FC = (): ReactElement =>  {
    const [bruker, setBruker] = useState<string | null | undefined>(auth.currentUser?.uid);
    const [lineData, setLineData] = useState<any[]>([]);
    const [malinger, setMalinger] = useState<string[]>([]);

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        setBruker(user.uid);
        console.log(credential);
        console.log(user);
        console.log(token);
      }
      

    useEffect(() => {
        console.log('brukeren ' + auth.currentUser?.displayName);
    }, [bruker])
    
    const fetchData = async () => {
        if (bruker)
        {
            const data = await getDocs(collection(db, "laktat", bruker, "malinger"));
   
            let m: string[] = [];

            data.forEach((doc) => {
                let laktat = doc.data();
                m.push(doc.id);

                let d: any[] = [];
                laktat.data.forEach((l: any) => {
                    let data = {
                        fart: l.fart,
                        laktat: l.verdi
                    }
                    d.push(data);
                    
                });

                if (lineData.length === 0) {
                    setLineData(d);

                }
            });

            setMalinger(m);
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
            <div>
                <ul>
                    {malinger.length > 0 && malinger.map( ma => (
                        <li>{ma}</li>
                    ))}
                </ul>
            </div>
            <div>
                <p>Laktat over km/t</p>
                <div className="line-chart-wrapper">
                    {lineData.length > 0 &&  
                    <LineChart width={700} height={400} data={lineData} syncId="test">
                        <CartesianGrid stroke="#f5f5f5" fill="#e6e6e6" />
                        <XAxis type="number" dataKey="fart" height={40} startOffset="4" tickCount={8} domain={[11, 15]} />
                        <YAxis type="number" width={80} domain={[1, 8]} />
                        <Tooltip />
                        <ReferenceLine y={4} stroke="green" />
                        <Line
                            key="uv"
                            type="monotone"
                            dataKey="laktat"
                            stroke="#ff7300"
                            strokeOpacity={opacity}
                            strokeDasharray="3 3"
                        >
                            <LabelList position="bottom" offset={10} dataKey="laktat" />
                        </Line>
                    </LineChart>
                    }
                </div>
            </div>
            <div>
                <p>Laktat over puls</p>
                <div className="line-chart-wrapper">
                    <LineChart width={700} height={400} data={dataPuls} syncId="test">
                        <CartesianGrid stroke="#f5f5f5" fill="#e6e6e6" />
                        <XAxis type="number" dataKey="puls" height={40} tickCount={12} domain={[130, 190]} />
                        <YAxis type="number" width={80} domain={[1, 8]} />
                        <Tooltip />
                        <ReferenceLine y={4} stroke="green" />
                        <Line
                            key="uv"
                            type="monotone"
                            dataKey="laktat"
                            stroke="#ff7300"
                            strokeOpacity={opacity}
                            strokeDasharray="3 3"
                        >
                            <LabelList position="bottom" offset={10} dataKey="laktat" />
                        </Line>
                    </LineChart>
                </div>
            </div>
            </>
        }
        </header>
    );
};

export default Laktat;
