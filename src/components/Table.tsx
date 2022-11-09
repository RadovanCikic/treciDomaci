import React from 'react'


interface Column {
    header: string,
    renderRow: (data: any) => React.ReactNode
}


interface Props {
    data: any[],
    columns: Column[]
}

export default function Table(props: Props) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    {
                        props.columns.map(column => {
                            return (
                                <th key={column.header}>{column.header}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map(element => {
                        return (
                            <tr>
                                {props.columns.map(column => {
                                    return (
                                        <td key={column.header}>{column.renderRow(element)}</td>
                                    )
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
