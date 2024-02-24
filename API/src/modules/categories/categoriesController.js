
import category from "../../../DB/models/category_model.js";

export const getAllCategories = async (req, res) => {
    try {
        const allCategories = await category.find();

        if(allCategories.length !== 0) {
            return res.status(200).send(allCategories);
        }
        res.status(200).send("No categories found!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const addCategory = async (req, res) => {
    try {
        const categoryName = {categoryName: req.body.categoryName};
        const data = await client.find(categoryName);

        if(data.length === 0){
            const newCategory = new category({
                ...req.body,
            });
    
            await newCategory.save();
            return res.status(200).send("Category has been created successfuly.");
        }
        res.status(200).send("Category is already exists.");
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryToUpdate = await category.findById(categoryId);

        if(categoryToUpdate) {
            const filter = { _id: categoryId };
            const update = { $set: { categoryName: req.body.categoryName, categoryDesc: req.body.categoryDesc} };
            await category.updateOne(filter, update);
            res.status(200).send("Category has been updated successfuly.");
        }
        else {
            res.status(200).send("There is no category with such id to update.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const categoryToDelete = await category.findById(categoryId);

        if(categoryToDelete){

            const filter = { _id: categoryId };

            await category.deleteOne(filter);
            res.status(200).send("Category has been deleted successfuly.");
        }
        else {
            res.status(200).send("Category deletion failed.");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Somthing went wrong!");
    }
}