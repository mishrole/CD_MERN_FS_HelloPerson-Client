import React, { useReducer } from 'react';
import { errorMessage, successMessage } from './../../utils/SwalMessage';
import { postPeople } from './../../helpers/postPeople';

const reducer = (state, action) => {
  if (action.type === 'reset') {
    return initialState;
  }

  return {
    ...state,
    [action.type]: action.payload
  }
}

const initialState = {
  firstName: {
    value: '',
    error: null
  },
  lastName: {
    value: '',
    error: null
  }
}

const AddPerson = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    let isValid = false;

    if (value.length > 0) {
      isValid = true;
    }

    dispatch({
      type: name,
      payload: {
        value: value,
        error: {
          result: isValid ? 'is-valid' : 'is-invalid',
          message: isValid ? 'Looks good!' : `Please provide a valid ${name}`
        }
      }
    })
  }

  const clearForm = () => {
    dispatch({ type: 'reset' });
  }

  const formIsValid = (e) => {
    const inputs = Array.from(e.target.children)
    .map(item => Array.from(item.children)
    .filter(item => item.localName === 'input'))
    .filter(item => item.length > 0)
    .flat();

    const emptyInputs = inputs.filter(item => item.value.length === 0);
    const invalidInputs = inputs.filter(item => item.classList.contains('is-invalid'));

    if (emptyInputs.length > 0 || invalidInputs.length > 0) {
      return false;
    }

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formIsValid(e)) {
      const data = {
        firstName: state.firstName.value,
        lastName: state.lastName.value
      }

      postPeople(data)
      .then(({ data }) => {
        successMessage(`<p>${data?.person?.firstName} ${data?.person?.lastName} has been added successfully!</p><p>Generated Id: ${data?.person?._id}</p>`);
        clearForm();
      })
      .catch((err) => {
        errorMessage(err.error._message || err.message, err.error.message);
      });
    } else {
      errorMessage("Please provide valid data");
    }
  }

  return (
    <div className="container">
      <h1 className="py-3">New Person</h1>
      <form className="row" onSubmit={ handleSubmit }>
        <div className="col-12 mb-3">
          <label className="form-label">First Name</label>
          <input type="text" value={ state.firstName.value } onChange={ handleChange } name="firstName" className={`form-control ${ state.firstName.error?.result }`} />
          {
            state.firstName.error !== null && (<p className={`${ state.firstName.error?.result === 'is-valid' ? 'valid-feedback' : 'invalid-feedback' }`}> {state.firstName.error?.message }</p>)
          }
        </div>

        <div className="col-12 mb-3">
          <label className="form-label">Last Name</label>
          <input type="text" value={ state.lastName.value } onChange={ handleChange } name="lastName" className={`form-control ${ state.lastName.error?.result }`} />
          {
            state.lastName.error !== null && (<p className={`${ state.lastName.error?.result === 'is-valid' ? 'valid-feedback' : 'invalid-feedback' }`}> {state.lastName.error?.message }</p>)
          }
        </div>

        <div className="col-12 mb-3 d-flex justify-content-center">
          <div>
          <button className="btn btn-primary" type="submit">Create Person</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddPerson;
