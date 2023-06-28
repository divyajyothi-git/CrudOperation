import React,{useState} from 'react'
import "./Modal.css"

export const Modal = ({ closeModal,onSubmit,defaultValue,rows,getNewId}) => {
const [formState,setFormState]=useState(defaultValue||
    {description:"",
     status:"live"})
const [errors,setErrors]=useState("")

const handleChange = (e)=>
{
    setFormState({
      ...formState,[e.target.name]:e.target.value
    })
}


const validateForm=(e)=>{
    if(formState.description && formState.status)
    {
        setErrors("")
        return true;
    }else{
        let errorField=[];
        for(const [key,value] of Object.entries(formState))
        {
            if(!value){
                errorField.push(key)
            }
        }
        setErrors(errorField.join(", "));
        return false;
    }
}

const handleSubmit = (e)=>{
    e.preventDefault();

    if(!validateForm()) return ;
    onSubmit(formState)
    closeModal();
}

  return (
    <div className='modal-container'
    onClick={(e)=>
        {
            if(e.target.className=== "modal-container")
            closeModal();
        }}
    >
        <div className='modal'>
           <form>
            <div className='form-group'>
                {/* <label htmlFor='page'>Page Number</label>
                <input name="page"   disabled="disabled" value={formState.page} onChange={handleChange}></input> */}
            </div>
            <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <textarea name="description" value={formState.description} onChange={handleChange}></textarea>
            </div>
            <div className='form-group'>
                <label htmlFor='status'>Status</label>
                <select name="status" value={formState.status} onChange={handleChange}>
                                <option value="live">Live</option>
                                <option value="draft">Draft</option>
                                <option value="error">Error</option>
                </select>
            </div>
            {errors && <div className='error'>{`Please include:${errors}`}</div>}
            <button type='submit' className='btn' onSubmit={validateForm} onClick={handleSubmit}>Submit</button>
           </form>
        </div>
    </div>
  )
}
