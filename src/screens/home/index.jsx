import React, { useEffect, useState, useContext } from 'react';
import Button from '@mui/material/Button';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { ROUTE_END_POINTS } from '../../constants/routeConstants';
import { API_END_POINTS } from '../../constants/apiConstants';
import API from '../../utils/api-service';
import { Modal, Pagination, TextField, Select, MenuItem, alertTitleClasses } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { setLoadingStatus } from '../../redux/actions/loadingAction';
import { useDispatch } from 'react-redux';

function HomePage() {
    const navigate = useNavigate();
    const ROUTE_PATH = ROUTE_END_POINTS;
    const END_POINTS = API_END_POINTS;
    const [employeeList, setEmployeeList] = useState([]);
    const [promptBox, setPromptBox] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchText, setSearchText] = useState('')
    const [tableFilters, setTableFilters] = useState({
        limit: 5,
        currentPage: 1,
        totalPages: 1,
        search: ''
    })
    const dispatch = useDispatch();

    const getEmployeeData = async () => {
        dispatch(setLoadingStatus(true))
        const response = await API(`${END_POINTS.GET_ALL_EMPLOYEE}?page=${tableFilters.currentPage}&size=${tableFilters.limit}&employeeName=${tableFilters.search}`, 'get');
        if (response && response.status === 200) {
            setEmployeeList(response.data.employee);
            setTableFilters({
                ...tableFilters,
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages,
            })
        } else {
            console.log(response)
        }
        dispatch(setLoadingStatus(false))
    }

    useEffect(() => {
        getEmployeeData()
    }, [tableFilters.currentPage, tableFilters.search, tableFilters.limit])

    const DeleteEmployee = async () => {
        setPromptBox(false);
        dispatch(setLoadingStatus(true))
        const response = await API(`${END_POINTS.DELETE_EMPLOYEE}?id=${selectedEmployee}`, 'delete');
        if (response && response.status === 201) {
            getEmployeeData();
        } else {
            console.log(response)
        }
        dispatch(setLoadingStatus(false))
    }

    const ChangeOfPage = (event, value) => {
        setTableFilters({
            ...tableFilters,
            currentPage: value
        })
    }

    const submitSearch = (e) => {
        if (e.key === 'Enter') {
            setTableFilters({
                ...tableFilters,
                search: searchText,
                currentPage: 1
            })
        }
    }
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <input className='input-field' value={searchText} onChange={(e) => { setSearchText(e.target.value) }} onKeyDown={(e) => { submitSearch(e) }} placeholder="search by name" />
                    <p className="input-field-guide-text">*Type value and press enter to search</p>
                </div>
                <Button size="small" variant="outlined" className='add-employee' onClick={() => { navigate(ROUTE_PATH.CREATE_EMPLOYEE) }}>Add an employee</Button>
            </div>

            <Table sx={{ minWidth: 650 }} style={{ marginTop: '20px' }} aria-label="simple table">
                <TableHead style={{ backgroundColor: '#C8C8C8' }}>
                    <TableRow>
                        <TableCell align="left">EmployeeName</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        employeeList.map((item, i) =>
                            <TableRow key={i}>
                                <TableCell align="left">{item.employeeName}</TableCell>
                                <TableCell align="left">{item.email}</TableCell>
                                <TableCell align="left">{item.phone}</TableCell>
                                <TableCell align="left" style={{ display: 'flex' }}>
                                    <RemoveRedEyeIcon style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => {
                                        navigate(ROUTE_PATH.VIEW_EMPLOYEE, { state: { employeeId: item._id, view: true } })
                                    }} />
                                    <EditIcon style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => {
                                        navigate(ROUTE_PATH.VIEW_EMPLOYEE, { state: { employeeId: item._id, edit: true } })
                                    }} />
                                    <DeleteIcon style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => {
                                        setSelectedEmployee(item._id)
                                        setPromptBox(true)
                                    }} />
                                </TableCell>
                            </TableRow>
                        )

                    }
                </TableBody>
            </Table>
            {employeeList.length === 0 && <p style={{ textAlign: 'center' }}>No record found</p>}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: "30px" }}>
                <div>
                    <label htmlFor="tableLimit" style={{ marginRight: '5px' }}>Rows per page:</label>
                    <Select
                        id="tableLimit"
                        value={tableFilters.limit}
                        onChange={(e) => {
                            setTableFilters({
                                ...tableFilters,
                                limit: e.target.value,
                            })
                        }
                        }
                        size='small'
                        style={{ height: '30px' }}
                    >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                    </Select>
                </div>
                <Pagination style={{ float: 'right' }} count={tableFilters.totalPages} page={tableFilters.currentPage} onChange={ChangeOfPage} />
            </div>
            <Modal
                open={promptBox}
                onClose={() => { setPromptBox(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='modal-popup'>
                    <p>Are you sure to delete employee?</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
                        <Button variant='outlined' onClick={() => { setPromptBox(false) }}>No</Button>
                        <Button variant='contiained' onClick={() => { DeleteEmployee() }}>Yes</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default HomePage;