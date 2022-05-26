const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

//get all blogs
router.get("/", (req, res) => {
  Blog.findAll({
    include: { all: true, nested: true }
  })
    .then(dbBlogs => {
      res.json(dbBlogs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//get one blog
router.get("/:id", (req, res) => {
  Blog.findByPk(req.params.id, {})
    .then(dbBlogs => {
      res.json(dbBlogs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//add a new blog
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "You need to login to post a Blog!" })
  }
  Blog.create({
    name: req.body.name,
    body: req.body.body,
    category_id: req.body.category_id
  })
    .then(newBlog => {
      res.json(newBlog);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update a Blog
router.put("/:id", (req, res) => {
  Blog.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedBlog => {
    res.json(updatedBlog);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//delete a blog
router.delete('/:id', (req, res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user.id
    }
  }).then(delBlog => {
    res.json(delBlog)
    location.reload();
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  })
});

module.exports = router;
