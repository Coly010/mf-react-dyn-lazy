import { registerRemotes, loadRemote } from "@module-federation/enhanced/runtime"
import { useEffect, lazy, useState } from "react"
import { REMOTES_CONFIG } from "../config/config"


let Remote2Cmp: any;
export const Remote2Wrapper = () => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        registerRemotes([{
            name: 'remote2',
            entry : REMOTES_CONFIG['remote2']
        }]);
        Remote2Cmp = lazy(() => loadRemote('remote2/Module') as any);
        setLoaded(true);
    }, [])

    return (
        <>
                {loaded ? <Remote2Cmp /> : <p>Loading</p>}
            
        </>
    )
}