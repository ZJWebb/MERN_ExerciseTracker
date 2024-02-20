import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditExercisePage = ({ exercise }) => {
 
    const [name, setName]       = useState(exercise.name);
    const [reps, setReps]         = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date.substring(0,10));
    
    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                name: name, 
                reps: reps, 
                weight: weight,
                unit: unit,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert("Successfully edited exercise!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update exercise. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    };

    return (
        <>
        <article>
            <h2>Edit the exercise in the collection</h2>
            <p>Edit previously entered exercises</p>
            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Edit exercise details below</legend>
                    <label for="name">Exercise name</label>
                    <input
                        type="text"
                        placeholder="Name of the exercise"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        id="name" 
                        required/>
                    <label for="reps">Reps</label>
                    <input
                        type="number"
                        value={reps}
                        min = "1"
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
                        min = "1"
                        onChange={e => setWeight(e.target.value)} 
                        id="weight"
                        name="weight" 
                        required/>
                    <label for="unit">Unit</label>
                    <select
                        placeholder="Unit of weight"
                        id="unit" 
                        name="unit"
                        value={unit}
                        onChange={e => setUnit(e.target.value)} 
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
                        onClick={editExercise}
                        id="submit"
                        name="submit"
                    >Save</button> updates to the collection</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditExercisePage;