import { registerRemotes, loadRemote } from "@module-federation/enhanced/runtime"
import { useEffect, lazy, useState } from "react"
import { REMOTES_CONFIG } from "../config/config"


let Remote1Cmp: any;
export const Remote1Wrapper = () => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        registerRemotes([{
            name: 'remote1',
            entry : REMOTES_CONFIG['remote1']
        }]);
        Remote1Cmp = lazy(() => loadRemote('remote1/Module') as any);
        setLoaded(true);
    }, [])

    return (
        <>
                {loaded ? <Remote1Cmp /> : <p>Loading</p>}
            
        </>
    )
}