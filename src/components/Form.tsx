import { type } from 'os'
import React, { useEffect, useState } from 'react'


type BaseInput = {
    name: string,
    label: string,
    required: boolean
}
type TextInput = {
    inputType: 'input',
    type: 'text' | 'number' | 'email' | 'password'

}

type Option = {
    value: string | number,
    label: string,
}

type SelectInput = {
    inputType: 'select'
    options: Option[]
}

type FullInputType = BaseInput & (SelectInput | TextInput)

interface Props {
    initialState: any,
    inputs: FullInputType[],
    onSubmit: (val: any) => any
}

export default function Form(props: Props) {
    const [formState, setFormState] = useState(props.initialState);

    useEffect(() => {
        if (props.initialState) {
            setFormState(props.initialState)
        } else {
            setFormState(props.inputs.reduce((acc, input) => {
                acc[input.name] = input.inputType === 'input' ? '' : 0
                return acc;
            }, {} as any))
        }
    }, [props.initialState, props.inputs]);

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
                            {
                                input.inputType === 'input' ? (
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
                                ) : (
                                    <select
                                        required={input.required}
                                        className='form-control'
                                        value={formState[input.name]}
                                        onChange={e => {
                                            const value = e.currentTarget.value;
                                            setFormState((prev: any) => {
                                                return {
                                                    ...prev,
                                                    [input.name]: Number(value)
                                                }
                                            })
                                        }}
                                    >
                                        {
                                            input.options.map(option => {
                                                return (
                                                    <option value={option.label}>{option.label}</option>
                                                )
                                            })
                                        }
                                    </select>
                                )
                            }
                        </div>
                    )
                })
            }
            <button className='btn btn-primary mt-2 form-control'>Submit</button>
        </form>
    )
}
