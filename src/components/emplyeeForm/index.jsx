import React from 'react';
import { useFormik } from 'formik';
import './index.css';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = (props) => {
  const { sendData, view, data, edit } = props;
  const navigate = useNavigate()
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const employeeData = data || null;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { employeeName: employeeData && employeeData.employeeName || '', phone: employeeData && employeeData.phone || '', email: employeeData && employeeData.email || '' },
    validationSchema: Yup.object({
      employeeName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: values => {
      sendData(values)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='form-wrapper'>
      <label htmlFor="employeeName">Employee Name:</label>
     <input
        id="employeeName"
        name="employeeName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.employeeName}
        className={view ? 'input-field-disabled' : 'input-field'}
        placeholder='Employee name'
        disabled={view}
      />
      {formik.touched.employeeName && formik.errors.employeeName ? (
        <div>{formik.errors.employeeName}</div>
      ) : null}

      <label htmlFor="phone">Phone:</label>
     <input
        id="phone"
        name="phone"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        className={view ? 'input-field-disabled' : 'input-field'}
        placeholder='Phone'
        disabled={view}
      />
      {formik.touched.phone && formik.errors.phone ? (
        <div>{formik.errors.phone}</div>
      ) : null}

      <label htmlFor="email">Email Address:</label>
     <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className={view || edit ? 'input-field-disabled' : 'input-field'}
        placeholder='Email'
        disabled={view || edit}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <div className='form-footer'>
        <Button variant='outlined' size="small" className='form-button' onClick={() => navigate(-1)}>Back</Button>
        {!view && <Button variant='contained' size="small" type="submit" className='form-button'>{edit ? 'Update' : 'Submit'}</Button>}
      </div>

    </form>
  );
};

export default EmployeeForm;