const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    console.log('home route triggered');
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });

        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        console.log('blogs:', blogs);

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in,
            pageTitle: "Adventures"
        });
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    console.log('getting blog data');
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                }
            ],
        });
        
        console.log('blogData:', blogData);

        const blog = blogData.get({ plain: true });

        console.log('blog:', blog);

        res.render('blog', {
            ...blog,
            loggedIn: req.session.logged_in
        });

    } catch (err) {
        console.log('Error:', err);
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    console.log('profile route triggered');
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });
  
        const user = userData.get({ plain: true });

        console.log('user:', user);

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    console.log('login route triggered');
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
