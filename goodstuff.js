let projects = [];
let currentFilter = "all";

const projectContainer = document.getElementById("project-container");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll("[data-filter]");

// JSON ophalen
fetch("./PROOJECTS.json")
    .then(response => response.json())
    .then(data => {
        projects = data;
        displayProjects();
    })
    .catch(error => {
        console.error("Er ging iets mis bij het laden van de projecten:", error);
    });


// Projecten tonen
function displayProjects() {

    const searchTerm = searchInput.value.toLowerCase();

    const filteredProjects = projects.filter(project => {

        // Filter op categorie
        const matchesFilter =
            currentFilter === "all" ||
            project.tag.toLowerCase() === currentFilter;

        // Filter op zoekterm
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.talen.toLowerCase().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });


    // Oude projecten verwijderen
    projectContainer.innerHTML = "";


    // Geen resultaten
    if (filteredProjects.length === 0) {
        projectContainer.innerHTML = "<p>Geen projecten gevonden.</p>";
        return;
    }


    // Projecten maken
    filteredProjects.forEach(project => {

        const projectElement = document.createElement("article");

        projectElement.classList.add("project");

        projectElement.innerHTML = `
            <h2>${project.title}</h2>

            <p>${project.description}</p>

            <p>
                <strong>Categorie:</strong> ${project.tag}
            </p>

            <p>
                <strong>Talen:</strong> ${project.talen}
            </p>

            <a href="${project.link}" target="_blank">
                Bekijk project
            </a>
        `;

        projectContainer.appendChild(projectElement);
    });
}


// Zoekfunctie
searchInput.addEventListener("input", () => {
    displayProjects();
});


// Filterknoppen
filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        displayProjects();

    });

});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        displayProjects();
    });

});