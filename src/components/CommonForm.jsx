import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
/******************* 
@purpose : Used for render form
@param:{}
@author:"ketan"
********************/
function CommonForm({
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  buttonLabel,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => (
        <Form>
          {fields.map((field) => (
            <div className='mb-3' key={field.name}>
              <label htmlFor={field.name} className='form-label'>
                {field.label}
              </label>
              <Field
                type={field.type}
                className='form-control'
                id={field.name}
                name={field.name}
              />
              <ErrorMessage
                name={field.name}
                component='div'
                className='text-danger'
              />
            </div>
          ))}
          <button type='submit' className='btn btn-primary w-100'>
            {buttonLabel}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default CommonForm;
