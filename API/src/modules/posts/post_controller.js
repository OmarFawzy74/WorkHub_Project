const ClientModel = require("../../../DB/models/client_model");
const FreelancerModel = require("../../../DB/models/freelancer_model");
const Postmodel = require("../../../DB/models/post_model");
const sendEmail = require("../../../common/email");


// const populateList=[{
//     path:"userID",
//     select:"email username freelancerImage_url"
// }]

const createPost = async (req, res) => {
    try {
        let imagesUrl = [];
        if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                let image = `${req.protocol}://${req.headers.host}/${req.files[i].destination}/${req.files[i].filename}`;
                imagesUrl.push(image);
            }
        }

        const { caption, tagsList } = req.body;

        let tagsClient = [];
        let tagsFreelancer = [];
        let tagsEmail = '';

        for (let i = 0; i < tagsList.length; i++) {
            const existClient = await ClientModel.findById(tagsList[i]).select('email');
            const existFreelancer = await FreelancerModel.findById(tagsList[i]).select('email');

            if (!existClient && !existFreelancer) {
                return res.status(400).json({ message: 'Invalid tag ID: ' + tagsList[i] });
            }

            if (existClient) {
                tagsClient.push(existClient._id);
                if (tagsEmail.length > 0) {
                    tagsEmail += ',' + existClient.email;
                } else {
                    tagsEmail = existClient.email;
                }
            } else {
                tagsFreelancer.push(existFreelancer._id);
                if (tagsEmail.length > 0) {
                    tagsEmail += ',' + existFreelancer.email;
                } else {
                    tagsEmail = existFreelancer.email;
                }
            }
        }

        const newpost = new Postmodel({
            caption,
            images: imagesUrl,
            createdByClient: req.user.role === 'client' ? req.user._id : null,
            createdByFreelancer: req.user.role === 'freelancer' ? req.user._id : null,
            tagsClient,
            tagsFreelancer
        });

        const savePost = await newpost.save();

        // Uncomment this section if you want to send emails
        // if (tagsEmail.length > 0) {
        //     await sendEmail(tagsEmail, `<p>You have been mentioned in a post by ${req.user._id}</p><br><a href='${req.protocol}://${req.headers.host}/post/${savePost._id}'>Show the post</a>`);
        // }

        res.json({ message: 'Post created successfully', savePost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getPost=async(req,res)=>{
    try {
        const{id}=req.params
        const post = await Postmodel.findById({_id:id})
            .populate('createdByClient', 'email username clientImage_url') // Populate the createdByClient field with email
            .populate('createdByFreelancer', 'email username freelancerImage_url'); // Populate the createdByFreelancer field with email

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: 'Post found', post });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        
    }
   

}
const getAllPosts=async(req,res)=>{
    try{

        const posts=await Postmodel.find();
        if(posts){
            res.status(200).json({ message: 'this is the post', posts });
            
        }else{
            res.status(400).json({ message: 'not found' });
        }
    }

    
 catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    
}


}


const createLikeToPost = async (req, res) => {
   
        const { id } = req.params;

        // Find the post by ID
        const post = await Postmodel.findById(id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        let liked = false;

        // Check if the user has already liked the post
        if (req.user.role === 'client' && post.likesClient.includes(req.user._id)) {
            liked = true;
        } else if (req.user.role === 'freelancer' && post.likesFreelancer.includes(req.user._id)) {
            liked = true;
        }

        // If the user has already liked the post, send a message
        if (liked) {
            return res.status(400).json({ message: 'You have already liked this post' });
        }

        // If the user hasn't liked the post, proceed to add the like
        if (req.user.role === 'client') {
            post.likesClient.push(req.user._id);
        } else if (req.user.role === 'freelancer') {
            post.likesFreelancer.push(req.user._id);
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Save the updated post
        const updatedPost = await post.save();

        // Populate createdByClient and createdByFreelancer fields
        await updatedPost.populate('createdByClient', 'email username clientImage_url')
        await updatedPost.populate('createdByFreelancer', 'email username freelancerImage_url')

        // Send response with updated post including likes
        res.status(200).json({ message: 'Like added successfully', updatedPost });
   
};


const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { caption } = req.body;

        // Find and update the post
        const updatedPost = await Postmodel.findOneAndUpdate(
            { _id: id },
            { caption: caption },
            { new: true } // To return the updated document
        );

        // Check if the post exists
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Send response with the updated post
        res.status(200).json({ message: 'Post updated successfully', updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createComment = async (req, res) => {
    const { id } = req.params;
    const { desc, tagslist  } = req.body;

    try {
        const post = await Postmodel.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        let tagsClient = [];
        let tagsFreelancer = [];
        
        for (let i = 0; i < tagslist.length; i++) {
            const existClient = await ClientModel.findById(tagslist[i]).select('email');
            const existFreelancer = await FreelancerModel.findById(tagslist[i]).select('email');

            if (!existClient && existFreelancer) {
                return res.status(400).json({ message: 'Invalid tag ID: ' + tagslist[i] });
            }

            if (existClient) {
                tagsClient.push(existClient._id);
            }

            if (existFreelancer) {
                tagsFreelancer.push(existFreelancer._id);
            }
        }

        if (!desc) {
            desc = ' ';
        }

        const newComment = {
            desc,
            createdByClient: req.user.role === 'client' ? req.user._id : null,
            createdByFreelancer: req.user.role === 'freelancer' ? req.user._id : null,
            tagsClient,
            tagsFreelancer
        };

        const updatedPost = await Postmodel.findByIdAndUpdate(id, {
            $push: {
                comment: newComment
            }
        }, { new: true })
        .populate({ path: 'createdByClient', select: 'email username clientImage_url', options: { strictPopulate: false } })
        .populate({ path: 'createdByFreelancer', select: 'email username freelancerImage_url', options: { strictPopulate: false } })
        .populate({ path: 'comment.createdByClient', select: 'email username clientImage_url', options: { strictPopulate: false } })
        .populate({ path: 'comment.createdByFreelancer', select: 'email username freelancerImage_url', options: { strictPopulate: false } });

        res.status(200).json({ message: 'Comment added successfully', updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

    





module.exports = {
    createPost,
    getPost,
    getAllPosts,
    createLikeToPost,
    updatePost,
    createComment
}
