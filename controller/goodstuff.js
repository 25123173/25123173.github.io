function normalizeCategory(category) {
    return (category || "")
        .toLowerCase()
        .replace(/[\s-]/g, "");
}

let projects = [];
let currentFilter = "all";

// HTML-elementen ophalen
const projectContainer = document.getElementById("project-container");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll("[data-filter]");

// PROJECTEN OPHALEN

async function loadProjects() {
    try {
        projectContainer.textContent = "Projecten laden...";

        projects = await getProjects();

        displayProjects();

    } catch (error) {
        console.error("Fout bij ophalen projecten:", error);

        projectContainer.textContent =
            "Er ging iets mis bij het ophalen van projecten.";
    }
}

// FILTER EN ZOEKFUNCTIE

function displayProjects() {

    const searchTerm = searchInput.value.toLowerCase();

    const filteredProjects = projects.filter(project => {

        // Categorie filter
        const category = normalizeCategory(project.categorie);

        const matchesFilter =
            currentFilter === "all" ||
            category === currentFilter;

        // Zoekfunctie
        const matchesSearch =
            (project.titel || "").toLowerCase().includes(searchTerm) ||
            (project.beschrijving || "").toLowerCase().includes(searchTerm) ||
            category.includes(searchTerm) ||
            (project.gitHubUrl || "").toLowerCase().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });


    // Oude projecten verwijderen
    projectContainer.replaceChildren();


    // Geen resultaten
    if (filteredProjects.length === 0) {
        projectContainer.textContent = "Geen projecten gevonden.";
        return;
    }


    // Projecten weergeven
    filteredProjects.forEach(project => {

        const projectElement = document.createElement("article");

        projectElement.classList.add("project");

        const title = document.createElement("h2");
        title.textContent = project.titel;

        const description = document.createElement("p");
        description.textContent = project.beschrijving;

        const category = document.createElement("p");
        category.innerHTML = "<strong>Categorie:</strong> ";

        const categoryText = document.createTextNode(project.categorie);
        category.appendChild(categoryText);

        projectElement.appendChild(title);
        projectElement.appendChild(description);
        projectElement.appendChild(category);


        // GitHub-link
        if (project.gitHubUrl) {
            const link = document.createElement("a");

            link.href = project.gitHubUrl;
            link.textContent = "Bekijk project";
            link.target = "_blank";
            link.rel = "noopener noreferrer";

            projectElement.appendChild(link);
        }

        projectContainer.appendChild(projectElement);
    });
}

// ZOEKFUNCTIE

searchInput.addEventListener("input", () => {
    displayProjects();
});

// FILTERKNOPPEN

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter.toLowerCase();

        // Actieve knop aanpassen
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayProjects();
    });

});

// PROJECTEN LADEN BIJ START

loadProjects();