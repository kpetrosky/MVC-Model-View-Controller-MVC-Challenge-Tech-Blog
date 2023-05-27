const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    console.log('homeroute triggered');
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

        console.log('blogs'); // Add a console log to check the value of blogs

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in,
            pageTitle: "Adventures"
        });
    } catch (err) {
        console.log('Error:', err); // Add a console log to display the error
        res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
    //take a look at ln 33 for path if needed
    //console.logthrough out....ie 1,2,3,4,5 to see where things are hitting
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
        console.log('logging blog data');
        console.log(blogData);
        const blog = blogData.get({ plain: true });

        console.log('blog1'); // Add a console log to check the value of blog
        console.log(blog);
        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        console.log('Error:', err); // Add a console log to display the error
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    console.log('blog2');
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });
        console.log('blog3');
        const user = userData.get({ plain: true });

        console.log('user:', user); // Add a console log to check the value of user

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log('Error:', err); // Add a console log to display the error
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    console.log('blog4_I have logged in');
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;
