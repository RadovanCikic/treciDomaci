import { type } from 'os'
import React, { useEffect, useState } from 'react'


type BaseInput = {
    name: string,
    label: string,
    required: boolean,
    type: 'text' | 'number' | 'email' | 'password'
}



interface Props {
    inputs: BaseInput[],
    onSubmit: (val: any) => any
}

export default function Form(props: Props) {
    const [formState, setFormState] = useState({} as any);
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                props.onSubmit(formState);
            }}
        >
            {
                props.inputs.map(input => {
                    return (
                        <div className='form-group' key={input.name}>
                            <label >{input.label}</label>
                            <input
                                required={input.required}
                                className='form-control'
                                type={input.type}
                                value={formState[input.name]}
                                onChange={e => {
                                    const value = e.currentTarget.value;
                                    setFormState((prev: any) => {
                                        return {
                                            ...prev,
                                            [input.name]: value
                                        }
                                    })
                                }}
                            />
                        </div>
                    )
                })
            }
            <button className='btn btn-primary mt-2 form-c'>Submit</button>
        </form>
    )
}
