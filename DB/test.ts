import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
	name: String,
	age: Number,
	email: String,
	password: String,
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('test', testSchema);
