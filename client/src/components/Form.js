import React, { useState, useEffect } from 'react'
import Axios from 'axios'


export default function Form({ formType, handleAdd, handleUpdate, handleDelete, selectedId }) {
    
    const [formData, setFormData] = useState({
        'id': '',
        'firstName': '',
        'lastName': '',
        'age': 0,
        'country': '',
        'position': '',
        'wage': '',
        'scheduled': false,
        'scheduleData': {}
    })

    useEffect(()=>{
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                id: ''
            }
        })
    }, [formData.firstName, formData.lastName, formData.age, formData.country, formData.position, formData.wage])

    function handleChange(event){
        const { name, value } = event.target
        setFormData(prevFormData => {
            return{
                ...prevFormData,
                [name]: value
            }
        })
    }


    
    function submitForm(submitFunction){
        const excludedValues = ['id', 'scheduled', 'scheduleData']
        const formDataCopy = {...formData}
        //Removing ID, Scheduled and Schedule Data
        excludedValues.forEach(excludedValue =>{
            if(formDataCopy.hasOwnProperty(excludedValue)){
                delete formDataCopy[excludedValue]
            }
        })
        //Axios.post('http://localhost:3001/create')
        const blank = element => !element
        let values = Object.values(formDataCopy)
        console.log(formDataCopy)

        if(values.some(blank)){
            console.log('blank values')
        } else{
            if(formType === 'update'){
               submitFunction(selectedId, formData)

            } else{
                submitFunction(formData)
            }
            clearForm()    
        }

    }

    function clearForm(){
        setFormData({
            'id': '',
            'firstName': '',
            'lastName': '',
            'age': 0,
            'country': '',
            'position': '',
            'wage': '',
            'scheduled': false,
            'scheduleData': {}
        })
    }

    return (
            formType === 'delete'
            ?
                <section className='form'>
                    <h1 className='form-header'>{formType} Employee</h1>
                    <label htmlFor='id'>ID</label>
                    <input name='id' type='text' id='id' value={formData.id} onChange={handleChange} required/>

                    <button className='btn' onClick={() => handleDelete(formData.id)}>Delete Employee</button>
                </section>
            :
                <section className='form'>
                    <h1 className='form-header'>{formType} Employee</h1>
                    {formType === 'update' && <label htmlFor='id'>ID</label>}
                    {formType === 'update' && <input name='id' type='text' id='id' value={selectedId !== '' ? selectedId : formData.id} onChange={handleChange} required/>}
        

                    <label htmlFor='first-name'>First Name</label>
                    <input name='firstName' type='text' id='first-name' value={formData.firstName} onChange={handleChange} required/>

                    <label htmlFor='last-name'>Last Name</label>
                    <input name='lastName' type='text' id='last-name' value={formData.lastName} onChange={handleChange} required/>

                    <label htmlFor='age'>Age</label>
                    <input name='age' type='number' id='age' value={formData.age} onChange={handleChange} required/>

                    <label htmlFor='country'>Country</label>
                    <input name='country' type='text' id='country' value={formData.country} onChange={handleChange} required/>

                    <label htmlFor='position'>Position</label>
                    <input name='position' type='text' id='position' value={formData.position} onChange={handleChange} required/>

                    <label htmlFor='wage'>Wage</label>
                    <input name='wage' type='number' id='wage' value={formData.wage} onChange={handleChange} required/>

                    {
                        formType === 'create' ?
                            <button className='btn' onClick={() => { submitForm(handleAdd) }}>Add Employee</button> 
                            : 
                            <button className='btn' onClick={() => { submitForm(handleUpdate) }}>Update Employee</button> 
                    }
                </section>
    )
}
