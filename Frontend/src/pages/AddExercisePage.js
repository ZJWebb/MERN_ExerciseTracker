import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddExercisePage = () => {

    const [name, setName]       = useState('');
    const [reps, setReps]         = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'post',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert("Successfully added the exercise!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        history.push("/");
    };


    return (
        <>
        <article>
            <h2>Add Exercise</h2>
            <p>Use this page to add details about your exercise.</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Add exercise details below</legend>

                    <label for="name">Exercise name</label>
                    <input
                        type="text"
                        placeholder="Name of the exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name"
                        name="name" 
                        required/>
                    
                    <label for="reps">Reps</label>
                    <input
                        type="number"
                        value={reps}
                        min = "0"
                        step = "1"
                        placeholder="Reps of the exercise"
                        onChange={e => setReps(e.target.value)} 
                        id="reps"
                        name="reps" 
                        required/>

                    <label for="weight">Weight</label>
                    <input
                        type="number"
                        placeholder="Weight of the exercise"
                        value={weight}
                        min = "0"
                        onChange={e => setWeight(e.target.value)} 
                        id="weight" 
                        name="weight"
                        required/>

                    <label for="unit">Unit</label>
                    <select
                        type="text"
                        placeholder="Unit of weight"
                        onChange={e => setUnit(e.target.value)} 
                        id="unit"
                        name="unit" 
                        required = "required">
                            <option value="Lbs.">Lbs.</option>
                            <option value="Kgs.">Kgs.</option>
                            <option value="Miles">Miles</option>
                            <option value="Kilometers">Kilometers</option>
                    </select>
                    

                    <label for="date">Date</label>
                    <input
                        type="date"
                        placeholder="Date"
                        value={date}
                        onChange={e => setDate(e.target.value)} 
                        id="date"
                        name="date" 
                        required/>

                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addExercise}
                        id="submit"
                        name="submit"
                    >Add</button> to the collection</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddExercisePage;