"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
exports.viewNotes = exports.deleteNote = exports.createNote = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notedata } = req.body;
    console.log(req.user);
    const userid = req.user;
=======
exports.viewNotes = exports.updateNote = exports.deleteNote = exports.createNote = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid, notedata } = req.body;
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
    console.log(req.body);
    const { data, error } = yield supabaseClient_1.default
        .from('notes')
        .insert([{ userid, notedata, completed: false }]);
    if (error) {
<<<<<<< HEAD
        console.log(error);
=======
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
        return res.status(500).send({ message: 'Error creating note', error });
    }
    res.status(201).send({ message: 'Note created', data });
});
exports.createNote = createNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteid } = req.params;
    const { data, error } = yield supabaseClient_1.default
        .from('notes')
        .delete()
        .eq('id', noteid);
    if (error) {
        return res.status(500).send({ message: 'Error deleting note', error });
    }
    res.status(200).send({ message: 'Note deleted', data });
});
exports.deleteNote = deleteNote;
<<<<<<< HEAD
// export const updateNote = async (req: AuthRequest, res: Response) => {
//   const { noteid, completed } = req.body;
//   const { data, error } = await supabase
//     .from("notes")
//     .update("completed", completed)
//     .eq("id", noteid);
//   if (error) {
//     return res.status(500).send({ message: 'Error updating note', error });
//   }
//   res.status(200).send({ message: 'Update note', data });
// };
const viewNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    console.log(userId);
    const { data, error } = yield supabaseClient_1.default
        .from("notes")
        .select("")
        .eq("userid", userId);
=======
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { noteid, completed } = req.body;
    const { data, error } = yield supabaseClient_1.default
        .from("notes")
        .update("completed", completed)
        .eq("id", noteid);
    if (error) {
        return res.status(500).send({ message: 'Error updating note', error });
    }
    res.status(200).send({ message: 'Update note', data });
});
exports.updateNote = updateNote;
const viewNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.body;
    console.log(userid);
    const { data, error } = yield supabaseClient_1.default
        .from("notes")
        .select("")
        .eq("userid", userid);
>>>>>>> 7688a5730b01e50bce37f34ee9a85579e5b4df96
    if (error) {
        return res.status(500).send({ message: 'Error viewing note', error });
    }
    res.status(200).send({ message: 'View Notes', data });
});
exports.viewNotes = viewNotes;
