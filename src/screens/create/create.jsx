import React from 'react';
import EmployeeForm from '../../components/emplyeeForm';
import API from '../../utils/api-service';
import { API_END_POINTS } from '../../constants/apiConstants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoadingStatus } from '../../redux/actions/loadingAction';

function CreateEmployeePage() {
    const END_POINTS = API_END_POINTS;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const CreateEmployee =async(data)=>{
      dispatch(setLoadingStatus(true))
      const response = await API(END_POINTS.CREATE_EMPLOYEE,'post',data);
      if(response && response.status && response.status === 400){
       alert(response.data.data)
      }else{
        navigate(-1)
      }
      dispatch(setLoadingStatus(false))
    }
    return ( 
        <div>
            <EmployeeForm sendData={CreateEmployee}/>
        </div>
     );
}

export default CreateEmployeePage;