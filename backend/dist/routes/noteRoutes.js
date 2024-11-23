"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const router = express_1.default.Router();
router.post('/create', noteController_1.createNote);
router.delete('/delete/:noteid', noteController_1.deleteNote);
router.post('/view', noteController_1.viewNotes);
exports.default = router;
