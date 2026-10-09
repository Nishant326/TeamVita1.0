const mongoose = require('mongoose');
const FileSchema = require('./fileSchema');
const BRANCHES = require('./branches');


const TopperSchema = new mongoose.Schema({
name: { type: String, required: true, trim: true },
title: { type: String },
semester: { type: String, required: true },
year: { type: Number },
photo: FileSchema,
branch: { type: String, enum: BRANCHES },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


module.exports = mongoose.model('Topper', TopperSchema);