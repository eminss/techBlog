// import modules and packages
const sequelize = require("../config/connection");
const { User, Blog } = require("../models");


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

// bulk create
const seed = async () => {

    try {
        await sequelize.sync({ force: true });

        await User.bulkCreate(users, { individualHooks: true });
        await Blog.bulkCreate(blogs);

        process.exit(0);
    } catch(err){
        console.log(err);
    };

};

seed();
