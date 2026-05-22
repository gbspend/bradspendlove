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
            <h4>${paper.title}</h4>
            <p>${paper.blurb}</p>
            <a href="${paper.url}" target="_blank">Read more →</a>
        `;

        container.appendChild(card);
    });
}

loadPapers();