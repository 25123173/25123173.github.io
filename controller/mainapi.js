const API_URL = "http://localhost:5034/api";

// Algemene functie voor API-verzoeken
async function apiRequest(endpoint, method = "GET", data = null) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    if (data !== null) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `API-fout ${response.status}: ${errorText}`
        );
    }

    // PUT en DELETE geven NoContent (204) terug
    if (response.status === 204) {
        return null;
    }

    return await response.json();
}

// PROJECTEN - CRUD

// Alle projecten ophalen
async function getProjects() {
    return await apiRequest("/projects");
}

// Eén project ophalen op ID
async function getProjectById(id) {
    return await apiRequest(`/projects/${id}`);
}

// Project aanmaken
async function createProject(project) {
    return await apiRequest("/projects", "POST", project);
}

// Project wijzigen
async function updateProject(id, project) {
    return await apiRequest(`/projects/${id}`, "PUT", project);
}

// Project verwijderen
async function deleteProject(id) {
    return await apiRequest(`/projects/${id}`, "DELETE");
}

// BLOGPOSTS - CRUD

// Alle blogposts ophalen
async function getBlogPosts() {
    return await apiRequest("/blogposts");
}

// Eén blogpost ophalen op ID
async function getBlogPostById(id) {
    return await apiRequest(`/blogposts/${id}`);
}

// Blogpost aanmaken
async function createBlogPost(blogPost) {
    return await apiRequest("/blogposts", "POST", blogPost);
}

// Blogpost wijzigen
async function updateBlogPost(id, blogPost) {
    return await apiRequest(`/blogposts/${id}`, "PUT", blogPost);
}

// Blogpost verwijderen
async function deleteBlogPost(id) {
    return await apiRequest(`/blogposts/${id}`, "DELETE");
}