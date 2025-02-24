import axios from 'axios';
const apiUrl = process.env.EXPO_PUBLIC_API_URI;
export const fetchHome = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('index res', token);
		const data = await axios
			.get(`${apiUrl}/index`, config)
			.then((res) => res.data);
		console.log('index res', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchUsers = async (token, id) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/users/search`, config)
			.then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchMatchUsers = async (token, id) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/users/match-profile`, config)
			.then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchUser = async (token, id) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/users/${id}`, config)
			.then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchLikes = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/users/likes`, config)
			.then((res) => res.data);
		console.log('likes', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchChats = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		const data = await axios
			.get(`${apiUrl}/chats`, config)
			.then((res) => res.data);
		console.log('chats', data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
export const fetchChatMessages = async (token, id) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	try {
		console.log('fetchChatMessages', id);
		const data = await axios
			.get(`${apiUrl}/chats/${id}`, config)
			.then((res) => res.data);
		return data;
	} catch (error) {
		console.log(error.message);
		return error;
	}
};
