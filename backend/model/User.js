const mongoose = require('mongoose');
const FileSchema = require('./fileSchema');
const BRANCHES = require('./branches');


const UserSchema = new mongoose.Schema({
registrationNumber: { type: String, required: true, unique: true, trim: true },
classId: { type: String, trim: true },
fullName: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
photo: FileSchema,
branch: { type: String, enum: BRANCHES, required: true },
year: { type: Number, min: 1 },
role: { type: String, enum: ['student', 'admin', 'teacher'], default: 'student' },
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema);