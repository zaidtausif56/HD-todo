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
exports.viewNotes = exports.deleteNote = exports.createNote = void 0;
const supabaseClient_1 = __importDefault(require("../supabaseClient"));
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notedata } = req.body;
    console.log(req.user);
    const userid = req.user;
    console.log(req.body);
    const { data, error } = yield supabaseClient_1.default
        .from('notes')
        .insert([{ userid, notedata, completed: false }]);
    if (error) {
        console.log(error);
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
    if (error) {
        return res.status(500).send({ message: 'Error viewing note', error });
    }
    res.status(200).send({ message: 'View Notes', data });
});
exports.viewNotes = viewNotes;
