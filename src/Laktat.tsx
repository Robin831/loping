import { FC, ReactElement, useEffect, useState } from "react";
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine, Line, LabelList } from "recharts";
import {  db, auth, provider } from "./firebaseSetup"
import { collection, getDocs } from "firebase/firestore"; 
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const data = [
    { fart: '11', laktat: 1.4 },
    { fart: '12', laktat: 3.1 },
    { fart: '13', laktat: 3.5 },
    { fart: '14', laktat: 7.1 },
  ];
  
  const dataPuls = [
    { puls: '140', laktat: 1.4 },
    { puls: '150', laktat: 3.1 },
    { puls: '161', laktat: 3.5 },
    { puls: '170', laktat: 7.1 },
  ];
  
  
  const initialState = {
    data,
    opacity: 1,
    anotherState: false,
  };

const Laktat: FC = (): ReactElement =>  {
    const state: any = initialState;
    const { data, opacity } = state;
    const [bruker, setBruker] = useState<string | null | undefined>(auth.currentUser?.displayName);

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        setBruker(user.displayName);
        console.log(credential);
        console.log(user);
      }
      

    useEffect(() => {
        console.log('brukeren ' + auth.currentUser?.displayName);
    }, [bruker, auth.currentUser?.displayName])
    // useEffect(() => {
        const fetchData = async () => {
            // await googleSignIn();
            console.log('bruker' + auth.currentUser?.displayName);
            const data = await getDocs(collection(db, "laktat"));
    
            data.forEach((doc) => {
                let laktat = doc.data();
                console.log(laktat.fart);
                console.log(`${doc.id} => ${doc.data()}`)
            });
        } 

    //     fetchData();
    // }, [])
  
    return (
        <header className="App-header">
        {!bruker && 
            <button onClick={googleSignIn}>Sign in with Google</button>
        }
        {bruker && 
            <>
            <p>Terskel</p>
            <button onClick={fetchData}>Hent data</button><div>
                        <p>Laktat over km/t</p>
                        <div className="line-chart-wrapper">
                            <LineChart width={700} height={400} data={data} syncId="test">
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
                        </div>
                    </div><div>
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
