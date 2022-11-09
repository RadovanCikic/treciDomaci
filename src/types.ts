

export interface User {
    name: string,
    email: string,
}

export interface UserRes {
    user: User,
    token: string
}

export interface Actor {
    id: number,
    first_name: string,
    last_name: string,
    birth_year: number,
    gender: string,
    email: string,
    instagram: string,
    personal_site: string,
}

export interface Movie {
    id: number,
    name: string,
    plot: string,
    release_year: number,
    genre: string,
    duration: number,
}