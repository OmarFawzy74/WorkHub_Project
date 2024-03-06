
import professors from "../../../DB/models/professors_model.js";

// Unfinished Tasks

// 1. Check Authentication
// 2. Check Authorization

// Get All Professors
export const getAllProfessors = async (req, res) => {

    const allProfessors = await professors.find();
    if (allProfessors.length == 0) {
        return next(new Error("professors Not found :("))
    }

    res.status(200).json({ success: true, message: allProfessors });
}

// Add professor
export const addProfessors = async (req, res) => {

    const professorsName = { proffName: req.body.proffName };
    const data = await professors.find(professorsName);

    if (data.length !== 0) {

        return next(new Error("this professor is already exist", 400));
    }

    const newProfessor = new professors({
        ...req.body,
    })
    await newProfessor.save();
    return res.status(200).json({ msg: "Professors has been created successfuly.", newProfessor });

}
// Update professor
export const updateProfessor = async (req, res) => {

    const proffId = req.params.id;
    const isProfessor = await professors.findById(proffId);

    if (!isProfessor) {
        return next(new Error("professors Not found", { cause: 404 }));
    }
  
    const updatedProfessor = await professors.findByIdAndUpdate(proffId, req.body, { new: true });
    return res.status(200).json({ msg: "Professors has been updated successfuly.", updatedProfessor });


}

// Delete Professors
export const deleteProfessors = async (req, res) => {

    const proffId = req.params.id
    const isProfessor = await professors.findById(proffId);

    if (isProfessor) {
        const filter = { _id: proffId };

        await professors.deleteOne(filter);
        res.status(200).json({ msg: "Proffessors has been deleted successfuly." });
    }
    else {
        return next(new Error("Proffessor not found.", { cause: 404 }));
    }

}

