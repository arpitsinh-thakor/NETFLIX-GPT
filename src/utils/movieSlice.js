import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name: "movies",
    initialState: {
        addNowPlayingMovies: null,
        trailerVideo: null,
    },
    reducers:{
        addNowPlayingMovies: (state, action) =>{
            state.addNowPlayingMovies = action.payload;
        },
        addTrailerVideo:(state, action)=>{
            state.trailerVideo = action.payload;;
        }
    }
});

export const{addNowPlayingMovies, addTrailerVideo} = movieSlice.actions;
export default movieSlice.reducer;