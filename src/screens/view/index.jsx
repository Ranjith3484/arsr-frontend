import React, { useState, useEffect, useContext } from 'react';
import EmployeeForm from '../../components/emplyeeForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_END_POINTS } from '../../constants/apiConstants';
import API from '../../utils/api-service';
import { useDispatch } from 'react-redux';
import { setLoadingStatus } from '../../redux/actions/loadingAction';

function ViewEmployee() {
    const END_POINTS = API_END_POINTS;
    const location = useLocation();
    const [employeeData, setEmployeeData] = useState({});
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const getEmployeeData = async (id) => {
        dispatch(setLoadingStatus(true))
        const response = await API(`${END_POINTS.GET_AN_EMPLOYEE}?id=${id}`, 'get');
        if (response && response.status === 201) {
            setEmployeeData(response.data.data)
        } else {
            console.log(response)
        }
        dispatch(setLoadingStatus(false))
    }
    useEffect(() => {
        const id = location.state.employeeId || null;
        setEdit(location.state.edit || false)
        if (id) {
            getEmployeeData(id)
        }
    }, [location]);

    const UpdateEmployee = async (data) => {
        const response = await API(END_POINTS.EDIT_EMPLOYEE, 'put', data);
        if (response && response.status && response.status === 200) {
            navigate(-1)
        }
    }
    return (
        <div>
            {
                employeeData ?
                    <EmployeeForm view={!edit} edit={edit} data={employeeData} sendData={UpdateEmployee} />
                    :
                    <p>no data</p>
            }
        </div>
    );
}

export default ViewEmployee;