import { AUTH_API_URL } from ".";

export const RegisterUserApi = async (formData) => {
	const response = await fetch(`${AUTH_API_URL}/register-user`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});
	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message);
	}

	return result;
};

export const LoginUserApi = async (formData) => {
	const response = await fetch(`${AUTH_API_URL}/login-user`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	});
	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message);
	}

	return result;
};

export const VerifyUserApi = async () => {
	const response = await fetch(`${AUTH_API_URL}/verify-user`, {
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const result = await response.json();

	if (!response.ok) {
		if(result.message === "You are not authorized") {
			return null
		}
	}

	return result;
};

export const LogoutUserApi = async () => {
	const response = await fetch(`${AUTH_API_URL}/logout-user`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.message)
	}

	return result;
};
