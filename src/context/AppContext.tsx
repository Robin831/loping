import { User } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Measurement } from '../Models/maling';
import { ContextProps } from './ContextProps';

type AppContextType = {
    isSigningIn: boolean;
    user: User | null;
    selectedMeasurement: Measurement | null;
    measurements: Measurement[];
    setIsSigningIn: (isSigningIn: boolean) => void;
    setUser: (user: User | null) => void;
    setMeasurements: (measurements: Measurement[]) => void;
    setSelectedMeasurement: (measurement: Measurement | null) => void;
};

export const AppContext = React.createContext<AppContextType>(undefined!);

export const AppProvider = ({ children }: ContextProps) => {
    const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement | null>(null);
    const [measurements, setMeasurements] = useState<Measurement[]>([]);

    return (
        <AppContext.Provider
            value={{
                isSigningIn,
                setIsSigningIn,
                user,
                setUser,
                measurements,
                setMeasurements,
                selectedMeasurement,
                setSelectedMeasurement
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppStore = () => useContext(AppContext);
