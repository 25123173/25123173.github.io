fetch("https://catfact.ninja/fact")
    .then(response => response.json())
    .then(data => {
        document.getElementById("cat-fact").textContent = data.fact;
    })
    .catch(error => {
        console.error("Er ging iets mis:", error);
    });