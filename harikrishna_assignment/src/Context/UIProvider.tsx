import { useState , type ReactNode } from "react";
import { UIContext,type Role } from "./UIContext";

export function UIProvider ({children}:{children:ReactNode}){
    const [role,setRole] = useState<Role>("viewer");

    return (
        <UIContext.Provider value={{role,setRole}}>
            {children}
        </UIContext.Provider>
    )
}