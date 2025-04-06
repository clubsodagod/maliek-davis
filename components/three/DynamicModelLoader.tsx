/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react';

const Dynamic3DLoader = ({ componentPath }: { componentPath: string }) => {
    const [Component, setComponent] = useState<React.FC | null>(null);
    const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     // Dynamically import the TSX component
    //     const loadComponent = async () => {
    //         let path = `../../../public/3d-objects/core-values/`
    //         try {
    //             // Map known paths to their respective modulePros
    //             const componentMap: Record<string, () => Promise<any>> = {
    //                 "../../../public/3d-objects/core-values/moon/Moon": () => import("../../../../public/3d-objects/core-values/moon/Moon"),
    //             };
        
    //             if (!componentMap[componentPath]) {
    //                 throw new Error(`Component path "${componentPath}" is not recognized.`);
    //             }
        
    //             const modulePro = await componentMap[componentPath]();
    //             if (modulePro.default) {
    //                 setComponent(() => modulePro.default);
    //             } else {
    //                 throw new Error(`No default export found in ${componentPath}`);
    //             }
    //         } catch (err: any) {
    //             setError(err.message);
    //         }
    //     };

    //     loadComponent();
    // }, [componentPath]);

    // if (error) {
    //     return null;
    // }

    if (!Component) {
        return null;
    }

    return <Component />;
};

export default Dynamic3DLoader;
