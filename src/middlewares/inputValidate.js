import Joi from 'joi';

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required()
});

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const validateUserInput = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
        status: 400,
        message: "Invalid input",
        error: error.details[0].message
        });
    }
    next();
};

export const validateRegisterInput = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: "Invalid input",
            error: error.details[0].message
        });
    }
    next();
};

export const validateLoginInput = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: "Invalid input",
            error: error.details[0].message
        });
    }
    next();
};

export default validateUserInput;

