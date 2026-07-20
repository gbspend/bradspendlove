async function loadPapers() {
    const response = await fetch("papers.json");
    const papers = await response.json();

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

// Redirects vertical mouse-wheel scrolling into horizontal scrolling
// for any .research-scroll container the cursor is over.
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.research-scroll').forEach((el) => {
        let snapResumeTimer;

        el.addEventListener('wheel', (e) => {
            // Ignore scroll events that are already mostly horizontal
            // (e.g. trackpad two-finger horizontal swipes).
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

            // Only hijack the wheel if there's actually room to scroll
            // horizontally; otherwise let the page scroll normally.
            if (el.scrollWidth <= el.clientWidth) return;

            e.preventDefault();

            // scroll-snap-type: mandatory otherwise fights every small
            // scrollLeft nudge by snapping straight back. Turn it off
            // while actively wheeling, then let it resume once scrolling
            // settles so cards still snap into place at rest.
            el.style.scrollSnapType = 'none';
            clearTimeout(snapResumeTimer);
            snapResumeTimer = setTimeout(() => {
                el.style.scrollSnapType = '';
            }, 150);

            el.scrollLeft += e.deltaY;
        }, { passive: false });
    });
});

loadPapers();