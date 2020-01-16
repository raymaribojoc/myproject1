import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmSelect } from 'components/shared/form/BwmSelect';
import { BwmTextArea } from 'components/shared/form/BwmTextArea';
import { BwmFileUpload } from 'components/shared/form/BwmFileUpload';
import { BwmResError } from 'components/shared/form/BwmResError';
// import { required, minLength4 } from 'components/shared/form/validators';

const AdCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
    <Field
        name="title"
        type="text"
        label='Title'
        className='form-control'
        component={BwmInput}
      />
       <Field
        name="description"
        type="text"
        label='Description'
        rows='6'
        className='form-control'
        component={BwmTextArea}
      />
      <Field
        name="city"
        type="text"
        label='City'
        className='form-control'
        component={BwmInput}
      />
      <Field
        name="street"
        type="text"
        label='Street'
        className='form-control'
        component={BwmInput}
      />
      <Field
        options={options}
        name="category"
        label='Category'
        className='form-control'
        component={BwmSelect}
      />
      <Field
        name="image"
        label='Image'
        component={BwmFileUpload}
      />
      
      <Field
        name="price"
        type="text"
        label='price'
        className='form-control'
        symbol='PHP'
        component={BwmInput}
      />
     
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Create Ads
      </button>
      <BwmResError errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'adCreateForm',
  initialValues: { shared: false, category: 'apartment'}
})(AdCreateForm)
