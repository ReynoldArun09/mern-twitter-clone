import Joi from "joi";

const PasswordRegex =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const RegisterSchema = Joi.object({
	username: Joi.string().min(3).max(20).required().messages({
		"string.base": "Username must be a string",
		"string.min": "Username must be at least {#limit} characters",
		"string.max": "Username must not exceed {#limit} characters",
		"any.required": "Username is required",
	}),
	fullName: Joi.string().min(3).max(50).required().messages({
		"string.base": "Full Name must be a string",
		"string.min": "Full Name must be at least {#limit} characters",
		"string.max": "Full Name must not exceed {#limit} characters",
		"any.required": "Full Name is required",
	}),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: ["com", "net", "org"],
		})
		.required()
		.messages({
			"string.base": "Email must be a string",
			"string.email": "Please enter a valid email address",
			"any.required": "Email is required",
		}),
	password: Joi.string()
		.regex(PasswordRegex)
		.min(6)
		.max(20)
		.required()
		.messages({
			"string.base": "Password must be a string",
			"string.min": "Password must be at least {#limit} characters",
			"string.max": "Password must not exceed {#limit} characters",
			"any.required": "Password is required",
			"string.pattern.base":
				"Password must contain at least one uppercase letter, one lowercase, one number and one special character",
		}),
});

export const LoginSchema = Joi.object({
	username: Joi.string().required().messages({
		"any.required": "Username is required",
	}),
	password: Joi.string().required().messages({
		"any.required": "Password is required",
	}),
});


export const postSchema = Joi.object({
  text: Joi.string().min(1).max(280),
  img: Joi.string().uri().optional()
});
