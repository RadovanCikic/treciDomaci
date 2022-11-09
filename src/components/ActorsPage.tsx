import React, { useEffect, useState } from 'react'
import { Actor } from '../types';
import axios from 'axios';
import Table from './Table';
import { Link } from 'react-router-dom';
export default function ActorsPage() {
    const [actors, setActors] = useState<Actor[]>([]);

    useEffect(() => {
        axios.get('/actors').then(res => { setActors(res.data) });
    }, [])

    return (
        <div className='container mt-3'>
            <h1 className='text-center m-4'>Actors</h1>
            <Table
                columns={[
                    {
                        header: 'Id',
                        renderRow: actor => actor.id
                    },
                    {
                        header: 'First name',
                        renderRow: (actor: Actor) => actor.first_name
                    },
                    {
                        header: 'Last name',
                        renderRow: (actor: Actor) => actor.last_name
                    },
                    {
                        header: 'Birth year',
                        renderRow: (actor: Actor) => actor.birth_year
                    },
                    {
                        header: 'Birth year',
                        renderRow: (actor: Actor) => actor.birth_year
                    },
                    {
                        header: 'Email',
                        renderRow: (actor: Actor) => actor.email
                    },
                    {
                        header: 'Instagram',
                        renderRow: (actor: Actor) => (
                            <a href={actor.instagram} target='_blank'>Link</a>
                        )
                    },
                    {
                        header: 'Personal site',
                        renderRow: (actor: Actor) => (
                            <a href={actor.personal_site} target='_blank'>Link</a>
                        )
                    }
                ]}
                data={actors}
            />
        </div>
    )
}
