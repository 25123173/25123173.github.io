async function displayBlogPosts() {
    const container = document.getElementById("blog-container");

    try {
        const posts = await getBlogPosts();

        container.replaceChildren();

        posts.forEach(post => {
            const article = document.createElement("article");
            article.classList.add("posts");

            const title = document.createElement("h2");
            title.textContent = post.titel;

            const content = document.createElement("p");
            content.textContent = post.inhoud;

            const date = document.createElement("small");
            date.textContent = new Date(
                post.publicatiedatum
            ).toLocaleDateString("nl-NL");

            article.appendChild(title);
            article.appendChild(content);
            article.appendChild(date);

            container.appendChild(article);
        });

    } catch (error) {
        console.error("Fout bij ophalen blogposts:", error);
        container.textContent = "Blogposts konden niet worden geladen.";
    }
}

displayBlogPosts();