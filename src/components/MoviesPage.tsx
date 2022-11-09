import React, { useEffect, useState } from 'react'
import { Movie } from '../types'
import axios from 'axios';
import Table from './Table';
import Form from './Form';
export default function MoviesPage() {

    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        axios.get('/movies').then(res => { setMovies(res.data) })
    }, [])

    return (
        <div className='container'>
            <h1 className='text-center m-3'>Movies</h1>
            <div className='row'>
                <div className='col-7'>
                    <Table
                        data={movies}
                        columns={[
                            {
                                header: 'Id',
                                renderRow: (movie: Movie) => movie.id
                            },
                            {
                                header: 'Name',
                                renderRow: (movie: Movie) => movie.name
                            },
                            {
                                header: 'Genre',
                                renderRow: (movie: Movie) => movie.genre
                            },
                            {
                                header: 'Release year',
                                renderRow: (movie: Movie) => movie.release_year
                            },
                            {
                                header: 'Duration',
                                renderRow: (movie: Movie) => movie.duration
                            }
                        ]}
                    />
                </div>

                <div className='col-1'>

                </div>
                <div className='col-4'>
                    <h3 className='text-center m-2'>Create movie</h3>
                    <Form
                        onSubmit={async val => {
                            const res = await axios.post('/movies', val);
                            setMovies(prev => [...prev, res.data]);
                        }}
                        inputs={[
                            {
                                label: 'Name',
                                name: 'name',
                                required: true,
                                type: 'text'
                            },
                            {
                                label: 'Plot',
                                name: 'plot',
                                required: true,
                                type: 'text'
                            },
                            {
                                label: 'Genre',
                                name: 'genre',
                                required: true,
                                type: 'text'
                            },
                            {
                                label: 'Release year',
                                name: 'release_year',
                                required: true,
                                type: 'number'
                            },
                            {
                                label: 'Duration',
                                name: 'duration',
                                required: true,
                                type: 'number'
                            }

                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
