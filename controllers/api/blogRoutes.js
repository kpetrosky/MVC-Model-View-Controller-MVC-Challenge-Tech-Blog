const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new blog entry
router.post('/', withAuth, async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log(newBlog);
        res.status(200).json(newBlog);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get all blog entries for the logged-in user
router.get('/:id', withAuth, async (req, res) => {
    try {
        const blogEntries = await Blog.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        console.log(blogEntries);
        res.status(200).json(blogEntries);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Delete a blog entry
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedBlog = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (deletedBlog) {
            res.status(200).json({ message: 'Blog entry deleted successfully' });
        } else {
            res.status(404).json({ message: 'Blog entry not found' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;


