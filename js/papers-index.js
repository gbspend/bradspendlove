async function loadPapers() {
    const response = await fetch("papers.json");
    const papers = await response.json();
	console.log(papers.length)

    const container = document.getElementById("research-scroll");
    papers
	.filter(p => p.featured)
	.forEach(paper => {
        const card = document.createElement("div");
        card.className = "research-card";

        card.innerHTML = `
            ${paper.image ? `<img src="${paper.image}" alt="${paper.title}">` : ""}
            <h4>${paper.title} (${paper.year})</h4>
            <p>${paper.blurb}</p>
            ${URL.canParse(paper.url) ? `<a href="${paper.url}" target="_blank">Paper link →</a>` : `<p class="card-note">${paper.url}</p>`}
        `;

        container.appendChild(card);
    });
}

loadPapers();