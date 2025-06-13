"use client"

import { createContext, FC, ReactNode, useContext, useMemo } from "react"
import { AppServiceType, InteractionService } from "./_library/classes-types-interaces";

// create AppService Context
const AppServiceContext = createContext<AppServiceType | undefined>(undefined);

// create function to use AppServiceContext
export const UseAppService = (): AppServiceType => {
    // create context
    const context = useContext(AppServiceContext);

    // error handling
    if (!context) {
        throw new Error(`"UseAppService" must be used within a "AppServiceProvider".`);
    }

    return context;
}





// create AppServiceProvider
/**
 * AppServiceProvider component that provides the application services context to its children.
 *
 * @param {Object} props - The properties object.
 * @param {ReactNode} props.children - The child components that will have access to the app services.
 *
 * @returns {JSX.Element} The AppServiceContext.Provider component with the app services.
 */
const AppServiceProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const interactionService = useMemo(() => new InteractionService(), []);

    const appService = useMemo(() => ({
        interactionService,
    }), [interactionService, ]);

    return (
        <AppServiceContext.Provider value={appService}>
            {children}
        </AppServiceContext.Provider>
    );
};


export default AppServiceProvider
