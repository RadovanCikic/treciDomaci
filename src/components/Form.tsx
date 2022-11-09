import { type } from 'os'
import React, { useEffect, useState } from 'react'


type BaseInput = {
    name: string,
    label: string
}
type TextInput = {
    type: 'input'
}

type Option = {
    value: string | number,
    label: string
}

type SelectInput = {
    type: 'select'
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
                acc[input.name] = input.type === 'input' ? '' : 0
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
                                input.type === 'input' ? (
                                    <input
                                        className='form-control'
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
        </form>
    )
}
