"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knexfile_1 = require("../knexfile");
const knex_1 = __importDefault(require("knex"));
const currentEnv = process.env.ENVIRONMENT || 'development';
const db = (0, knex_1.default)(knexfile_1.config[currentEnv]);
exports.default = db;
