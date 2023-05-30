import { API_URL } from '@env';

export async function getPokemonsApi() {
    try {
        const url =`${API_URL}/pokemon?offset=0&limit=20`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getPokemonApi(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}