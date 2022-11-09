import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const ColorModeContext = createContext({
    mode: '',
    setMode: () => {alert('oie')}
})

export default function ColorModeProvider(props){
    const [mode, setMode] = useState(props.initialValue)
    return(
        <ColorModeContext.Provider value={{mode: mode, setMode: setMode}}>
            {props.children}
        </ColorModeContext.Provider>
    )
}