const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const router = require('express').Router();

//get all comments
router.get("/", (req, res) => {
  Comment.findAll({
    include: { all: true, nested: true }
  })
    .then(dbComments => {
      res.json(dbComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//get one comment
router.get("/:id", (req, res) => {
  Comment.findByPk(req.params.id, {})
    .then(dbComments => {
      res.json(dbComments);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//add a new comment
router.post("/", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ msg: "You need to login to post a Comment!" })
  }
  Comment.create({
    body: req.body.body,
    blog_id: req.body.blog_id,
    user_id: req.session.user.id
  })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//update a comment
router.put("/:id", (req, res) => {
  Comment.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedComment => {
    res.json(updatedComment);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({ msg: "an error occured", err });
    });
});

//delete a comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
      user_id: req.session.user.id
    }
  }).then(delComment => {
    res.json(delComment)
    location.reload();
  }).catch(err => {
    console.log(err);
    res.status(500).json({ msg: "an error occured", err });
  })
});

module.exports = router;
