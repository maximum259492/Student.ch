import {createSlice} from '@reduxjs/toolkit';

export const userBanSlice = createSlice({
	name: 'userBan',
	initialState: {
		bannedUsers: [],
	},
	reducers: {
		banUser(state, action) {
			const userToBan = action.payload;
			state.bannedUsers = [...state.bannedUsers, userToBan];
		},
		unbanUser(state, action) {
			const idToRemove = action.payload;
			state.bannedUsers = state.bannedUsers.filter(id => id !== idToRemove);
		},
	},
});

export const {banUser, unbanUser} = userBanSlice.actions;
export const selectBannedUsers = state => state.userBan.bannedUsers;

