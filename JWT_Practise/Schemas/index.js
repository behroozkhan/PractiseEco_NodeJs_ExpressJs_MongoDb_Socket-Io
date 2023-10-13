import Joi from 'joi';

const JoiValidSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'Name should have at least {#limit} characters',
            'string.max': 'Name should not exceed {#limit} characters',
            'any.required': 'Name is required',
        }),

    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
            'string.min': 'Password should have at least {#limit} characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            'any.required': 'Password is required',
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),

    phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone number must be a 10-digit numeric value',
            'string.empty': 'Phone number is required',
            'any.required': 'Phone number is required',
        }),
});

const JoiValidSchemaLogin = Joi.object({
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        .required()
        .messages({
            'string.min': 'Password should have at least {#limit} characters',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            'any.required': 'Password is required',
        }),

    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .messages({
            'string.email': 'Email must be a valid email address',
            'any.required': 'Email is required',
        }),
});

export  {JoiValidSchema,JoiValidSchemaLogin};
