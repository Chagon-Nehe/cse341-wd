import validator from 'validator';

const contactValidation = (req, res, next) => {
    const validationRules = {
        firstName: {
            required: true,
            isLength: { options: { min: 2, max: 100 } }
        },
        lastName: {
            required: true,
            isLength: { options: { min: 2, max: 100 } }
        },
        email: {
            required: true,
            isEmail: true
        },
        favoriteColor: {
            required: false,
            isLength: { options: { min: 3, max: 20 } }
        },
        birthday: {
            required: false,
            isDate: true
        }
    };

    const validationErrors = [];
    for (const [key, rules] of Object.entries(validationRules)) {
        const value = req.body[key];
        if (rules.required && (!value || value.trim() === '')) {
            validationErrors.push(`${key} is required`);
        } else if (value) {
            if (rules.isLength) {
                if (!(value.length >= rules.isLength.options.min && value.length <= rules.isLength.options.max)) {
                    validationErrors.push(`${key} must be between ${rules.isLength.options.min} and ${rules.isLength.options.max} characters`);
                }
            }
            if (rules.isEmail && !validator.isEmail(value)) {
                validationErrors.push(`${key} must be a valid email address`);
            }
            if (rules.isDate && !validator.isDate(value)) {
                validationErrors.push(`${key} must be a valid date`);
            }
        }
    }

    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }

    next();
};

export default contactValidation;