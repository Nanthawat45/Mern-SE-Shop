import stripsService from '../services/stripsService';
import {AuthContext} from '../context/AuthContext';
import {useContext} from 'react';

const PaymentButton = ({cartItems}) => {
    const {user} = useContext(AuthContext);
    const handleCheckOut = () => {
        stripsService.createCheckoutSession({
    cart:cartItems,
    email:user.email,
    }).then((res)=>{
        if(res.data.url){
            window.location.href = res.data.url;
        }
    })
    .catch((res)=>{
        if(res.data.url){
            window.location.href = res.data.url;
        }
    })
    .catch((error)=> console.log(err.message));
    };
    return(
    <div>
        <button className="btn btn-md bg-red text-whit px-8 py-1" onClick={()=>handleCheckOut()}>
            proceed to checkout
        </button>
    </div> 
    );
};

export default PaymentButton;