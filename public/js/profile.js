const submitNewBlog = document.querySelector("#submitNewBlog");
submitNewBlog.addEventListener("click", e => {
    e.preventDefault();
    console.log("============clicked submitNewBlog============")

    const blogObject = {
        name: document.querySelector("#newBlogName").value,
        body: document.querySelector("#newBlogBody").value
    };

    console.log("========================", blogObject);
    fetch("/api/blog", {
        method: "POST",
        body: JSON.stringify(blogObject),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.reload();
        } else {
            alert("Post error, please try again.");
        };
    })
})