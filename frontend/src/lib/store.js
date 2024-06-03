import {configureStore} from '@reduxjs/toolkit';
import {userSlice} from '@/lib/slices/userSlice/userSlice';
import {latestThreadsSlice} from '@/lib/slices/latest-threads/latestThreadsSlice';
import {foodThreadsSlice} from '@/lib/slices/food-threads/foodThreadsSlice';
import {dormThreadsSlice} from '@/lib/slices/dorm-threads/dormThreadsSlice';
import {studyThreadsSlice} from '@/lib/slices/study-threads/studyThreadsSlice';
import {threadSlice} from '@/lib/slices/threadSlice/threadSlice';
import {commentSlice} from '@/lib/slices/commentSlice/commentSlice';
import {commentReplySlice} from '@/lib/slices/commentReplySlice/commentReplySlice';
import {userBanSlice} from '@/lib/slices/userBanSlice/userBanSlice';
import {userModeratorSlice} from '@/lib/slices/userModeratorSlice/userModeratorSlice';
import {moderatorPageSlice} from '@/lib/slices/moderatorPageSlice/moderatorPageSlice';
import {hiddenThreadsSlice} from '@/lib/slices/hiddenThreadsSlice/hiddenThreadsSlice';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		latestThreads: latestThreadsSlice.reducer,
		foodThreads: foodThreadsSlice.reducer,
		dormThreads: dormThreadsSlice.reducer,
		studyThreads: studyThreadsSlice.reducer,
		thread: threadSlice.reducer,
		comment: commentSlice.reducer,
		commentReply: commentReplySlice.reducer,
		userBan: userBanSlice.reducer,
		userModerator: userModeratorSlice.reducer,
		moderatorPage: moderatorPageSlice.reducer,
		hiddenThreads: hiddenThreadsSlice.reducer,
	},
});
