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
