async function loadPublications() {
    const response = await fetch("papers.json");
    const papers = await response.json();

    papers.sort((a, b) => b.year - a.year);

    const container = document.getElementById("publications-list");

    let currentYear = null;

    papers.forEach(paper => {
        if (paper.year !== currentYear) {
            currentYear = paper.year;

            const yearHeader = document.createElement("h4");
            yearHeader.textContent = currentYear;
            yearHeader.style.marginTop = "2rem";
            container.appendChild(yearHeader);
        }

        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
			${paper.image ? `<img src="${paper.image}" alt="${paper.title}">` : ""}
			<h4>${paper.title}</h4>
			<p>with ${paper.authors}</p>
			<p><em>${paper.venue}</em></p>
			<p>${paper.blurb}</p>
			${paper.url ? `<p><a href="${paper.url}" target="_blank" class="button">Paper link →</a></p>` : ""}
		`;

        container.appendChild(div);
    });
}

loadPublications();