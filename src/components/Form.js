import React, { useState, useEffect } from 'react'
import Axios from 'axios'


export default function Form({ formType, handleAdd, handleUpdate, handleDelete, selectedId, selectedDatabase }) {
    
    const [formData, setFormData] = useState({
        'id': selectedId || '',
        'firstName': '',
        'lastName': '',
        'currentStatus': '',
        'city': '',
        'state': '',
        'emailAddress': '',
    })

    // useEffect(()=>{
    //     setFormData(prevFormData => {
    //         return{
    //             ...prevFormData,
    //             id: ''
    //         }
    //     })
    // }, [formData.firstName, formData.lastName, formData.age, formData.country, formData.position, formData.wage])

    function handleChange(event){
        const { name, value } = event.target
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [name]: value
            }
        })
    }


    
    function submitForm(){
        const excludedValues = ['id']
        const formDataCopy = {...formData}
        //Removing ID from check
        excludedValues.forEach(excludedValue =>{
            if(formDataCopy.hasOwnProperty(excludedValue)){
                delete formDataCopy[excludedValue]
            }
        })
        //Check For Blanks
        const blank = element => !element
        let values = Object.values(formDataCopy)
        
        if(formType === 'delete' && formData.id){
            handleDelete(formData.id)
        }
        
        else if(formType === 'create' && !values.some(blank)){
            handleAdd(formData)
        }
        else if(formType === 'update' && formData.id && !values.some(blank)){
            handleUpdate(formData.id, formData)
        }
        
        clearForm()    

    }

    function clearForm(){
        setFormData({
            'id': '',
            'firstName': '',
            'lastName': '',
            'currentStatus': '',
            'city': '',
            'state': '',
            'emailAddress': '',
        })
    }

    return (
        formType === 'delete'
        ?
            <section className='form'>
                <h1 className='form-header'>{formType} Candidate</h1>
                <label htmlFor='id'>ID</label>
                <input name='id' type='text' id='id' value={formData.id} onChange={handleChange} required/>

                <button className='btn' onClick={submitForm}>Delete Candidate</button>
            </section>
        :
            <section className='form'>
                <h1 className='form-header'>{formType} Candidate</h1>
                {formType === 'update' && <label htmlFor='id'>ID</label>}
                {formType === 'update' && <input name='id' type='text' id='id' value={selectedId !== '' ? selectedId : formData.id} onChange={handleChange} required/>}
    

                <label htmlFor='first-name'>First Name</label>
                <input name='firstName' type='text' id='first-name' value={formData.firstName} onChange={handleChange} required/>

                <label htmlFor='last-name'>Last Name</label>
                <input name='lastName' type='text' id='last-name' value={formData.lastName} onChange={handleChange} required/>

                <label htmlFor='currentStatus'>Current Status</label>
                <input name='currentStatus' type='text' id='currentStatus' value={formData.currentStatus} onChange={handleChange} required/>

                <label htmlFor='city'>City</label>
                <input name='city' type='text' id='city' value={formData.city} onChange={handleChange} required/>

                <label htmlFor='state'>State</label>
                <input name='state' type='text' id='state' value={formData.state} onChange={handleChange} required/>

                <label htmlFor='emailAddress'>Email Address</label>
                <input name='emailAddress' type='email' id='emailAddress' value={formData.emailAddress} onChange={handleChange} required/>

                {
                    formType === 'create' ?
                        <button className='btn' onClick={submitForm}>Add Candidate</button> 
                        : 
                        <button className='btn' onClick={submitForm}>Update Candidate</button> 
                }
            </section>
    )
}
