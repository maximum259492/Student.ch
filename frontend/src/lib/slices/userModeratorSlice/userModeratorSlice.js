import {createSlice} from '@reduxjs/toolkit';

export const userModeratorSlice = createSlice({
	name: 'userModerator',
	initialState: {
		moderators: [],
		users: [],
	},
	reducers: {
		makeModerator(state, action) {
			const user = action.payload;
			state.moderators = [...state.moderators, user];
			state.users = state.users.filter(user => user !== action.payload);
		},

		makeUser(state, action) {
			const user = action.payload;
			state.users = [...state.users, user];
			state.moderators = state.moderators.filter(user => user !== action.payload);
		},

	},
});

export const {makeModerator, makeUser} = userModeratorSlice.actions;

export const selectModerators = state => state.userModerator.moderators;
export const selectUsers = state => state.userModerator.users;
