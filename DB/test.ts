import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide a name'],
		validate: {
			validator: (value: string) => value.length > 2,
			message: 'Name must be longer than 2 characters',
		},
	},
	age: {
		type: Number,
		default: 0,
		validate: {
			validator: (value: number) => value >= 0,
			message: 'Age must be a positive number',
		},
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		unique: true,
		validate: {
			validator: (value: string) => {
				const re = /\S+@\S+\.\S+/;
				return re.test(value);
			},
			message: 'Please provide a valid email',
		},
	},
	password: {
		type: String,
		required: [true, 'Please provide a strong password'],
		validate: {
			validator: (value: string) => {
				const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
				return re.test(value);
			},
			message:
				'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter and one number',
		},
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('test', testSchema);
