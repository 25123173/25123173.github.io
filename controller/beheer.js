let editingProjectId = null;
let editingBlogId = null;

const projectList = document.getElementById("beheer-projects");
const blogList = document.getElementById("beheer-blogs");
const statusElement = document.getElementById("beheer-status");


// ==================================
// STATUS
// ==================================

function showStatus(message) {
    statusElement.textContent = message;
}


// ==================================
// PROJECTEN WEERGEVEN
// ==================================

async function loadProjects() {
    try {
        const projects = await getProjects();

        projectList.replaceChildren();

        projects.forEach(project => {
            const article = document.createElement("article");

            const title = document.createElement("h3");
            title.textContent = project.titel;

            const description = document.createElement("p");
            description.textContent = project.beschrijving;

            const category = document.createElement("p");
            category.textContent = "Categorie: " + project.categorie;

            // Eén project ophalen op ID en in het formulier laden
            const editButton = document.createElement("button");
            editButton.textContent = "Bewerken";

            editButton.addEventListener("click", async () => {
                try {
                    const item = await getProjectById(project.id);

                    editingProjectId = item.id;

                    document.getElementById("project-titel").value = item.titel;
                    document.getElementById("project-beschrijving").value = item.beschrijving;
                    document.getElementById("project-categorie").value = item.categorie;
                    document.getElementById("project-github").value = item.gitHubUrl;

                    document.getElementById("project-form-title").textContent =
                        "Project wijzigen";

                    document.getElementById("cancel-project-edit").hidden = false;

                    document.getElementById("project-form").scrollIntoView({
                        behavior: "smooth"
                    });

                } catch (error) {
                    showStatus(error.message);
                }
            });

            // Project verwijderen
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Verwijderen";

            deleteButton.addEventListener("click", async () => {
                if (!confirm(`Weet je zeker dat je "${project.titel}" wilt verwijderen?`)) {
                    return;
                }

                try {
                    await deleteProject(project.id);

                    showStatus("Project verwijderd.");
                    await loadProjects();

                } catch (error) {
                    showStatus(error.message);
                }
            });

            article.appendChild(title);
            article.appendChild(description);
            article.appendChild(category);
            article.appendChild(editButton);
            article.appendChild(deleteButton);

            projectList.appendChild(article);
        });

    } catch (error) {
        console.error(error);
        showStatus("Projecten laden mislukt: " + error.message);
    }
}


// ==================================
// PROJECT AANMAKEN OF WIJZIGEN
// ==================================

document.getElementById("project-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const project = {
        titel: document.getElementById("project-titel").value,
        beschrijving: document.getElementById("project-beschrijving").value,
        categorie: document.getElementById("project-categorie").value,
        gitHubUrl: document.getElementById("project-github").value
    };

    try {
        if (editingProjectId !== null) {
            await updateProject(editingProjectId, project);
            showStatus("Project gewijzigd.");
        } else {
            await createProject(project);
            showStatus("Project aangemaakt.");
        }

        resetProjectForm();
        await loadProjects();

    } catch (error) {
        showStatus("Opslaan mislukt: " + error.message);
    }
});


// Projectformulier resetten
function resetProjectForm() {
    editingProjectId = null;

    document.getElementById("project-form").reset();

    document.getElementById("project-form-title").textContent =
        "Nieuw project toevoegen";

    document.getElementById("cancel-project-edit").hidden = true;
}

document.getElementById("cancel-project-edit").addEventListener("click", resetProjectForm);


// ==================================
// BLOGPOSTS WEERGEVEN
// ==================================

async function loadBlogs() {
    try {
        const posts = await getBlogPosts();

        blogList.replaceChildren();

        posts.forEach(post => {
            const article = document.createElement("article");

            const title = document.createElement("h3");
            title.textContent = post.titel;

            const content = document.createElement("p");
            content.textContent = post.inhoud;

            const date = document.createElement("small");
            date.textContent = new Date(post.publicatiedatum)
                .toLocaleDateString("nl-NL");

            // Blogpost ophalen op ID
            const editButton = document.createElement("button");
            editButton.textContent = "Bewerken";

            editButton.addEventListener("click", async () => {
                try {
                    const item = await getBlogPostById(post.id);

                    editingBlogId = item.id;

                    document.getElementById("blog-titel").value = item.titel;
                    document.getElementById("blog-inhoud").value = item.inhoud;

                    document.getElementById("blog-form-title").textContent =
                        "Blogpost wijzigen";

                    document.getElementById("cancel-blog-edit").hidden = false;

                    document.getElementById("blog-form").scrollIntoView({
                        behavior: "smooth"
                    });

                } catch (error) {
                    showStatus(error.message);
                }
            });

            // Blogpost verwijderen
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Verwijderen";

            deleteButton.addEventListener("click", async () => {
                if (!confirm(`Weet je zeker dat je "${post.titel}" wilt verwijderen?`)) {
                    return;
                }

                try {
                    await deleteBlogPost(post.id);

                    showStatus("Blogpost verwijderd.");
                    await loadBlogs();

                } catch (error) {
                    showStatus(error.message);
                }
            });

            article.appendChild(title);
            article.appendChild(content);
            article.appendChild(date);
            article.appendChild(editButton);
            article.appendChild(deleteButton);

            blogList.appendChild(article);
        });

    } catch (error) {
        console.error(error);
        showStatus("Blogposts laden mislukt: " + error.message);
    }
}


// ==================================
// BLOGPOST AANMAKEN OF WIJZIGEN
// ==================================

document.getElementById("blog-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const blogPost = {
        titel: document.getElementById("blog-titel").value,
        inhoud: document.getElementById("blog-inhoud").value,
        publicatiedatum: new Date().toISOString()
    };

    try {
        if (editingBlogId !== null) {
            await updateBlogPost(editingBlogId, blogPost);
            showStatus("Blogpost gewijzigd.");
        } else {
            await createBlogPost(blogPost);
            showStatus("Blogpost aangemaakt.");
        }

        resetBlogForm();
        await loadBlogs();

    } catch (error) {
        showStatus("Opslaan mislukt: " + error.message);
    }
});


// Blogformulier resetten
function resetBlogForm() {
    editingBlogId = null;

    document.getElementById("blog-form").reset();

    document.getElementById("blog-form-title").textContent =
        "Nieuwe blogpost toevoegen";

    document.getElementById("cancel-blog-edit").hidden = true;
}

document.getElementById("cancel-blog-edit").addEventListener("click", resetBlogForm);


// ==================================
// START
// ==================================

loadProjects();
loadBlogs();