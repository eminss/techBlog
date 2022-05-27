// import modules and packages
const sequelize = require("../config/connection");
const { User, Blog, Comment } = require("../models");


// users
const users = [
    {
        username: "bobross",
        password: "password"
    }
];

// blogs
const blogs = [
    {
        name: "cleanCode",
        body: "Keeping your code clean is great for development and testing purposes. No one likes messy code!",
        user_id: 1
    },
    {
        name: "SnailTime",
        body: "SnailTime is my most recent idea about how people need to put their life into the prespective of a snail. Take a second, slow down and appreciate where you're at.",
        user_id: 1
    },
    {
        name: "AvocadoNetGuac",
        body: "I honestly just like the internet and avacados. Mix them together for AvacadoNetGuac!",
        user_id: 1
    }
];

const comments = [
    {
        body: "Wow that is clean!",
        blog_id: 1,
        user_id: 1
    },
    {
        body: "Slimy code!",
        blog_id: 2,
        user_id: 1
    }
]

// bulk create
const seed = async () => {

    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(users, { individualHooks: true });
        await Blog.bulkCreate(blogs);
        await Comment.bulkCreate(comments);

        process.exit(0);
    } catch(err){
        console.log(err);
    };

};

seed();
