import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Game } from '../../types/Game';

interface GamesState {
    games: Game[];
    favourites: Game[];
    loading: boolean;
    error: string | null;
}

const initialState: GamesState = {
    games: [],
    favourites: [],
    loading: false,
    error: null,
};

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
    const response = await axios.get('https://mock-game-api-9a408f047f23.herokuapp.com/api/games', {
        headers: { 'X-API-Key': '' }, // API_KEY goes here
    });
    return response.data;
});

const gamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        addFavourite: (state, action: PayloadAction<Game>) => {
            state.favourites.push(action.payload);
        },
        removeFavourite: (state, action: PayloadAction<number>) => {
            state.favourites = state.favourites.filter(game => game.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.loading = false;
                state.games = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch games';
            });
    },
});

export const { addFavourite, removeFavourite } = gamesSlice.actions;
export default gamesSlice.reducer;
