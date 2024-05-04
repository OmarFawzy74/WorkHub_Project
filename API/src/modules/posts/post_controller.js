
import client_model from "../../../DB/models/client_model.js";
import ClientModel from "../../../DB/models/client_model.js"
import freelancer_model from "../../../DB/models/freelancer_model.js";
import FreelancerModel from "../../../DB/models/freelancer_model.js"
import Postmodel from "../../../DB/models/post_model.js"


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Postmodel.find();
        const modifiedPosts = [];

        for (const post of posts) {
            let modifiedPost = { ...post._doc };
            let data;

            if (modifiedPost.posterType === "freelancer") {
                data = await freelancer_model.findById(modifiedPost.posterId);
            } else if (modifiedPost.posterType === "client") {
                data = await client_model.findById(modifiedPost.posterId);
            } else {
                return res.status(404).json({ message: 'Invalid role' });
            }

            modifiedPost.posterId = { ...data._doc };
            modifiedPost.posterId.image_url = "http://" + req.hostname + ":3000/" + modifiedPost.posterId.image_url;
            modifiedPost.media_url = "http://" + req.hostname + ":3000/" + modifiedPost.media_url;
            modifiedPosts.push(modifiedPost);
        }

        if (modifiedPosts.length > 0) {
            return res.status(200).json({ posts: modifiedPosts });
        } else {
            return res.status(404).json({ message: 'No posts found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const addPost = async (req, res) => {
    try {
        const { communityId, posterId, posterType, caption } = req.body

        const newpost = new Postmodel({
            communityId,
            posterId,
            posterType,
            caption,
        });

        const savePost = await newpost.save();

        res.json({ message: 'Post created successfully', savePost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const uploadPostMedia = async (req, res) => {
    try {

        if (!req.file) {
            return res.status(404).send({ success: false, message: "media is required" });
        }

        const id = req.params.id;

        if (id == undefined) {
            return res.status(404).send({ success: false, message: "id is required" });
        }

        const media_url = req.file.filename;

        const filter = { _id: id };
        const update = { $set: { media_url: media_url } };

        await Postmodel.updateOne(filter, update);

        res.json({ message: 'Media uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPost = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Postmodel.findById({ _id: id })
            .populate('createdByClient', 'email username clientImage_url') // Populate the createdByClient field with email
            .populate('createdByFreelancer', 'email username freelancerImage_url'); // Populate the createdByFreelancer field with email

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post found', post });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }


};

export const addLike = async (req, res) => {
    try {
        const postId = req.params.id;
        const postToUpdate = await Postmodel.findById(postId);

        if (postToUpdate) {
            let likes = postToUpdate.likes
            const filter = { _id: postId };
            const update = { $set: { likes: likes + 1 } };

            await Postmodel.updateOne(filter, update);

            return res.status(200).json({ msg: "post like added successfuly." });
        }

        res.status(400).json({ msg: "There is no post with such id to update." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const removeLike = async (req, res) => {
    try {
        const postId = req.params.id;
        const postToUpdate = await Postmodel.findById(postId);

        if (postToUpdate) {
            let likes = postToUpdate.likes
            const filter = { _id: postId };
            const update = { $set: { likes: likes - 1 } };

            await Postmodel.updateOne(filter, update);

            return res.status(200).json({ msg: "post like removed successfuly." });
        }

        res.status(400).json({ msg: "There is no post with such id to update." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const postToUpdate = await Postmodel.findById(postId);

        if (postToUpdate) {
            const filter = { _id: postId };
            const update = { $set: { comments: req.body.comment } };

            await Postmodel.updateOne(filter, update);

            return res.status(200).json({ msg: "post comment added successfuly." });
        }

        res.status(400).json({ msg: "There is no post with such id to update." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const postToUpdate = await Postmodel.findById(communityId);

        if (postToUpdate) {
            const filter = { _id: postId };
            const update = { $set: { ...req.body } };
            await Postmodel.updateOne(filter, update);
            return res.status(200).json({ msg: "past has been updated successfuly." });
        }

        res.status(400).json({ msg: "There is no post with such id to update." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Somthing went wrong!" });
    }
}

export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new Error("Invalid post id", { cause: 404 }));
        }
        const data = await Service.findById(id);
        if (!data) {
            return next(new Error("Post not found", { cause: 404 }));
        }
        const filter = { _id: id }
        const process = await Service.deleteOne(filter);

        if (process) {
            fs.unlinkSync("./src/middleware/upload/" + data.media_url); //delete old image

            return res.status(200).json({ success: true, message: "Post deleted successfully" });
        }

        next(new Error("Service not found", { cause: 404 }));

    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: "Server Error" });
    }
};
