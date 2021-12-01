import React from 'react';
import {TextInputWrapper} from "./Input";
import {useForm} from "react-hook-form";

function App() {

    const {
        handleSubmit,
        control
    } = useForm(
        {
            defaultValues: {
                demo: "",
            }
        }
    );

    const onSubmit = (data: { demo: string }) => {
        alert(JSON.stringify(data, null, 2));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputWrapper label="my demo label" name="demo" control={control}/>
            <input type="submit"/>
        </form>
    );
}

export default App;
