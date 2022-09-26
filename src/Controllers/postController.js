import Post from "../models/postModel.js"

class postController {
    static postHome = (req, res) => {
        console.log('REQUISIÇÃO', req);
        res.status(200).send({
            "message": "Olá, pessoa!"
        });
    };

    static createPost = async (req, res) => {
        try {
            const post = await Post.create(req.body)
            res.status(201).send(post)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }

    }

    static getAllPosts = async (req, res) => {
        try {
            const posts = await Post.find()
            res.json(posts)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

    static getOnePost = async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (post == null) {
                return res.status(404).json({ message: 'Cannot find post' })

            }
            res.send(post)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static updatePost = async (req, res) => {
        let post
        try {
            post = await Post.findById(req.params.id)
            if (post == null) {
                return res.status(404).json({ message: 'Cannot find post' })

            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
        res.post = post
        if (req.body.content != null) {
            res.post.content = req.body.content
        }
        if (req.body.image != null) {
            res.post.image = req.body.image
        }
        if (req.body.title != null) {
            res.post.title = req.body.title
        }
        res.post.date = Date.now()
        try {
            const updatedPost = await res.post.save()
            res.json(updatedPost)
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    static deletePost = async (req, res) => {
        let post
        try {
            post = await Post.findById(req.params.id)
            if (post == null) {
                return res.status(404).json({ message: 'Cannot find post' })

            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
        res.post = post
        try {
            await res.post.remove()
            res.json({ message: "Deleted post" })
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }
}



export default postController;