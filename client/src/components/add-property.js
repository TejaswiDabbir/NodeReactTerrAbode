import React from 'react'

const AddProperty = (props) => {

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        var formData = new FormData(e.currentTarget);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    }

    return (
        <div className="row">
            <form onSubmit={onSubmit}>
                Title <input type='text' name='title'></input>
                Description <input type='textbox'></input>
                Room type <input type='text'></input>
                bedrooms <input type='text'></input>
                LOCATION
                Street name <input type='text'></input>
                Apt/Unit <input type='text'></input>
                City <input type='text'></input>
                State <input type='text'></input>
                Country <input type='text'></input>
                zip <input type='text'></input>
                <input type="file" name="imgCollection" multiple />
                <input type='submit'></input>
            </form>

        </div>
    )
};

export default AddProperty