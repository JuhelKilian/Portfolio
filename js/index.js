document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const links = {
        "aPropos": document.getElementById("LaPropos"),
        "formation": document.getElementById("Lformation"),
        "projets": document.getElementById("Lprojets"),
        "compétences": document.getElementById("Lcompétences"),
        "contact": document.getElementById("Lcontact")
    };

    const sectionVisibility = {};

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: Array.from(Array(101).keys(), i => i / 100) // Create an array [0, 0.01, 0.02, ..., 1]
    };

    const observerCallback = (entries, observer) => {
        // Update visibility for each entry
        entries.forEach(entry => {
            sectionVisibility[entry.target.id] = entry.intersectionRatio;
        });

        // Clear the console at the beginning of each callback
        console.clear();

        // Log visibility of all sections
        for (const id in sectionVisibility) {
            console.log(`${id}: ${Math.round(sectionVisibility[id] * 100)}% visible`);
        }

        // Find the section with the highest visibility
        let mostVisibleSection = null;
        let maxVisibility = 0;

        for (const id in sectionVisibility) {
            if (sectionVisibility[id] > maxVisibility) {
                maxVisibility = sectionVisibility[id];
                mostVisibleSection = id;
            }
        }

        // Update classes based on most visible section
        for (const [key, link] of Object.entries(links)) {
            if (key === mostVisibleSection) {
                link.classList.add("highlight");
            } else {
                link.classList.remove("highlight");
            }
        }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        sectionVisibility[section.id] = 0; // Initialize visibility tracking
        observer.observe(section);
    });
});

function fermeture() {
    const pageForm = document.getElementById("pageAjoutJustificatif");
    pageForm.hidden = true;

}

class Projet {
    constructor(titre, paragraphe, lienImage) {
        this.titre = titre;
        this.paragraphe = paragraphe;
        this.lienImage = lienImage;
    }

    changerProjet() {
        const titreElement = document.getElementById("titreProjet");
        const paragrapheElement = document.getElementById("paraProjet"); // Correction de l'ID
        const imageElement = document.getElementById("photoProjet"); // Correction de l'ID

        titreElement.innerText = this.titre;
        paragrapheElement.innerHTML = this.paragraphe;
        imageElement.src = this.lienImage;

    }
}

class ListeProjets {
    constructor() {
        this.listeProjets = [];
    }

    ajouterProjet(titre, paragraphe, lienImage) {
        let tempProjet = new Projet(titre, paragraphe, lienImage);
        this.listeProjets.push(tempProjet); // Utilisation de push au lieu de append
        console.log("Projet ajouté à la liste des projets.");
    }

    retourneProjet(numero) {
        if (numero > 0 && numero <= this.listeProjets.length) {
            return this.listeProjets[numero - 1];
        } else {
            console.error("Numéro de projet invalide.");
            return null;
        }
    }
}

let liste = new ListeProjets();

// Exemple d'ajout de projet et de changement de projet
liste.ajouterProjet("Sirius",
    "Lors de mon année de terminale, j'ai pu participer aux trophées NSI, un concours" +
    " national ouvert aux élèves ayant pris la spécialité NSI. J'y ai proposé notre Projet" +
    " <b><u>Sirius</u></b>, qui a gagné le <b>prix régional de a créativité</b>." +
    " Malheureusement, il n'a pas été retenu au niveau national. Ce projet fut très enrichissant" +
    ". J'ai appris la construction d'un projet, le développement d'une idée, la structuration " +
    "des tâches, du temps, des rôles de chacun. Puis les phases de test, la revue de code par les" +
    " autres membres de l'équipe. Ensuite, il nous a permis de voir les API, de s'améliorer en python" +
    ", notemment avec pygame. Enfin, il nous a permis de comprendre la logique et la physique" +
    " derrière ce genre de jeux.</br>" +
    "Pour retrouver ce projet, vous pouvez vous rendre sur : <br><br>" +
    "<u><b><a href='https://tube-sciences-technologies.apps.education.fr/w/dWcpCkhfHzdBB19aHe435A'>La vidéo</a></b></u><br>" +
    "<u><b><a href='https://mega.nz/file/EX03gLDa#cK6CIEPAm0OQ7GiPainOFRus6yVU35gDr8-3gH61TRI'>Le télécharger</a></b></u><br>" +
    "<u><b><a href='https://d1t9mwb4xrtjag.cloudfront.net/archives2023/4trTVTHNn5OyjbJBlzwooXfI1wG225KmwDrsjfr8.pdf'>La documentation</a></b></u>",
    "images/sirius.png");
liste.ajouterProjet("Titre 2", "Paragraphe 2", "image2.jpg");


document.addEventListener("DOMContentLoaded", function() {
    const carouselItems = document.querySelectorAll(".carousel-item");

    carouselItems.forEach(item => {
        item.addEventListener("click", function() {
            const numero = this.getAttribute("data-numero");
            const pageForm = document.getElementById("pageAjoutJustificatif");
            pageForm.hidden = false;
            idProjet = this.id;
            liste.retourneProjet(idProjet).changerProjet();
        });
    });
});
