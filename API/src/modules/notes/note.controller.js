import { Note } from "../../../DB/models/note.model.js";
import { User } from "../../../DB/models/user.model.js";

export const addNote = async (req, res, next) => {
    const { title, content, color } = req.body;
    const userId = req.payload.id;
    const isUser = await User.findById(userId);
    if (!isUser) {
        return next(new Error("user not found :(", { cause: 404 }));
    }

    await Note.create({ title, content, color, userId });
    return res.status(201).json({ success: true, message: "Note added successfully <3" });

};

export const updateNote = async (req, res, next) => {
    const { id } = req.params;
    const { title, color, content } = req.body;
    const userId = req.payload.id;
    const note = await Note.findOneAndUpdate(
        { _id: id, userId },
        { title, color, content }
    );
    if (!note) {
        return next(new Error("Invalid user or Id", { cause: 401 }));
    }

    return res.status(200).json({ success: true, message: "note Updated successfully <3" });

};

export const deleteNote = async (req, res, next) => {
    const { id } = req.params;
    const userId = req.payload.id;
    const isUser = await User.findById(userId);
    if (!isUser)
        return next(new Error("Invalid user", { cause: 401 }));
    const isNote = await Note.findById(id);
    if (!isNote)
        return next(new Error("Note Invalid :(", { cause: 401 }));
    if (isNote.userId.toString() != userId)
        return next(new Error("U R Note The Owner", { cause: 401 }))
    await isNote.deleteOne();

    return res.status(200).json({ success: true, message: "note deleted successfully <)" });

};

export const getNotesWithUserId = async (req, res) => {
    const userId = req.payload.id;
    const isUser = await User.findById(userId);
    if (!isUser) {
        return next(new Error("User Dosen't Exist :(", { cause: 400 }));
    }

    const note = await Note.find({ userId: userId }).populate({
        path: "userId",
        select: "name email -_id",
    });
    return res.status(200).json({ success: true, results: note });
};

export const addToFavorite = async (req, res, next) => {
    const user = await User.findById(req.payload.id);
    const note = await Note.findById(req.params.id);

    if (!user || !note) {
        return next(new Error("User or note not found", { cause: 404 }));
    }

    // hena bndeef elNote lw m4 mawgoda :)
    if (!user.favoriteNotes.includes(note._id)) {
        user.favoriteNotes.push(note._id);
        await user.save();
    }
    else {

        const index = user.favoriteNotes.indexOf(note); 
        user.favoriteNotes.splice(index, 1);
        await user.save();
    }

    res.status(201).json({ message: 'Done' });
}

export const getAllFavorite = async (req, res, next) => {
    const user = await User.findById(req.payload.id).populate('favoriteNotes');

    if (!user) {
        return next(new Error("User  not found", { cause: 404 }));
    }

    res.status(200).json(user.favoriteNotes);
}

// export const getAllNotes = async (req, res, next) => {
//     const notes = await Note.find().populate({
//         path: "userId",
//         select: "name email -_id"
//     });
//     return res.json({ success: true, results: { notes } });
// };