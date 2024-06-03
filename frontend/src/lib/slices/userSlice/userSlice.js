import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {
			firstName: '',
			lastName: '',
			username: '',
			likes: [],
		},
		isLoggedIn: Boolean(localStorage.getItem('accessToken')),
		isBanned: false,
	},
	reducers: {
		logIn(state, action) {
			state.isLoggedIn = true;
			state.user = {...state.user, ...action.payload};
		},
		register(state, action) {
			state.isLoggedIn = true;
			state.user = {...state.user, ...action.payload};
		},
		logOut(state) {
			state.isLoggedIn = false;
			state.user = {firstName: '', lastName: '', username: ''};
		},
		changeUsername(state, action) {
			state.user.username = action.payload.username;
		},
		toggleFav(state, action) {
			const threadId = action.payload;
			const isLiked = state.user.likes.includes(threadId);
			if (!isLiked) {
				state.user.likes.push(threadId);
			} else {
				state.user.likes = state.user.likes.filter(id => id !== threadId);
			}
		},
	},
});
export const {logIn, logOut, changeUsername, toggleFav, register} = userSlice.actions;
export const user = state => state.user.user;
export const userLikes = state => state.user.user.likes;
export const isLoggedIn = state => state.user.isLoggedIn;
export default userSlice.reducer;
