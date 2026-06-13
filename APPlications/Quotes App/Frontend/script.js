const container = document.getElementById("quotes-container");

async function loadQuotes() {
    try {
        const response = await fetch(
            "http://localhost:8080/api/quotes"
        );

        const quotes = await response.json();

        container.innerHTML = "";

        quotes.forEach(q => {

            const card = document.createElement("div");
            card.classList.add("quote-card");

            card.innerHTML = `
                <p class="quote">"${q.quote}"</p>
                <p class="author">— ${q.author}</p>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);

        container.innerHTML =
            "<h3>Failed to load quotes</h3>";
    }
}

loadQuotes();