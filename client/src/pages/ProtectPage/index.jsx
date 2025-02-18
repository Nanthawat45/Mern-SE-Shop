import{ useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Navigate ,useLocation} from 'react-router'

const Index = ({children})=>{
    const {user,isLogin}=useContext(AuthContext);
    const location = useLocation
    if (isLogin){
        return <div>loading.....</div>
    }
    if (children){
        return children;
    }
    if (!user){
        return<Navigate to ="/signin"/>
    }
    return children ;
};
export default Index;