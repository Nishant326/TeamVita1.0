
const mongoose = require('mongoose');
const FileSchema = require('./fileSchema');
const BRANCHES = require('./branches');


const ResultSchema = new mongoose.Schema({
title: { type: String, required: true, trim: true },
semester: { type: String, required: true },
year: { type: Number },
pdf: FileSchema,
branch: { type: String, enum: BRANCHES },
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });


module.exports = mongoose.model('Result', ResultSchema);