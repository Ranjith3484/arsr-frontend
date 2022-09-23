import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function NotFound() {
     let navigate = useNavigate();
     useEffect(()=>{
          navigate(-1)
     },[])
    return ( 
       <div>
            <p>Page not found</p>
            <p>Redirecting to previous page...</p>
       </div>
     );
}

export default NotFound;