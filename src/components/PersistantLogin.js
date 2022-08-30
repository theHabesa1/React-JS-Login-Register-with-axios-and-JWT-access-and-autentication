import { Outlet } from "react-router-dom";
import { useEffect,useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";


const  PersistantLogin = () => {
    const [isLoading,setIsLoading] = useState(true);
    const { auth, persist } = useAuth();
    const refresh = useRefreshToken();

    useEffect( () => {
        let isMounted = true;

        const verifyRefreshToken = async () =>{
            try{
                await refresh();
            }catch(err){
                console.log(err);

            }finally{
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    },[])

    useEffect(() =>{
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    },[isLoading])
    return (
        <>
            {!persist
                ? <Outlet/>
                :isLoading 
                    ? <p>loading .....</p>
                        :<Outlet/>
        }
        </>
    

  )
}

export default PersistantLogin