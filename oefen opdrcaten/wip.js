const text = document.querySelector("h1");

text.textContent= "pain and more pain";
text.style.color= "maroon";

const newParagraph = document.createElement("p");
newParagraph.textContent = "BLOOD FOR THE BLOOD GOD.";
document.body.appendChild(newParagraph);

const button1 = document.querySelector("#prijssort");
const button2 = document.querySelector("#populariteitsort");

const trinkets = [
    {
        name: "bloody skull",
        prijs: 250,
        populariteit: 3
    },  
    {
        name: "pristine skull",
        prijs: 4000,
        populariteit: 9
    },
    {
        name: "broken skull",
        prijs: 150,
        populariteit: 6
    },
    {
        name: "skull fragment",
        prijs: 50,
        populariteit: 4
    },
    {
        name: "ornamental skull",
        prijs: 6000,
        populariteit: 8
    },
    {
        name: "debin skull",
        prijs: 25000,
        populariteit: 1
    }
];

trinkets.forEach((trinket) => {
    console.log(trinket.name );
    console.log(trinket.prijs);
    console.log(trinket.populariteit);
});

button1.addEventListener("click", () => {
    trinkets.sort((a, b) => a.prijs - b.prijs);
    trinkets.forEach((trinket) => {
    console.log(trinket.name );
    console.log(trinket.prijs);
    console.log(trinket.populariteit);
});
});

button2.addEventListener("click", () => {
    trinkets.sort((a, b) => b.populariteit - a.populariteit);
    trinkets.forEach((trinket) => {
    console.log(trinket.name );
    console.log(trinket.prijs);
    console.log(trinket.populariteit);
});
});