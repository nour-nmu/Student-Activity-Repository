let allEvents = [];
let filteredEvents = [];

function id(i) {
    return document.getElementById(i);
}

function loadEvents() {
    try {
        const stored = localStorage.getItem("events");
        allEvents = stored ? JSON.parse(stored) : [];

        allEvents.forEach(e => {
            e.category = e.type || 'event';
        });


        allEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch {
        allEvents = [];
    }

    filteredEvents = [...allEvents];
}

function setupFilters() {
    const search = id("searchInput");
    const category = id("categoryFilter");
    const applyDate = id("applyDateRange");

    if (search) search.addEventListener("input", applyFilters);

    if (category) category.addEventListener("change", applyFilters);
    if (applyDate) applyDate.addEventListener("click", applyFilters);

    setInterval(() => {
        const stored = localStorage.getItem("events");
        if (stored !== JSON.stringify(allEvents)) {
            loadEvents();
            applyFilters();
        }
    }, 10000);
}

function applyFilters() {
    const search = id("searchInput").value.toLowerCase();
    const dateRange = id("dateRangeFilter").value;
    const category = id("categoryFilter").value;

    filteredEvents = allEvents.filter(e => {
        const title = (e.title || "").toLowerCase();
        const year = e.date.split("-")[0];
        const eventCategory = (e.category || e.type || 'event').toLowerCase();

        if (search && !title.includes(search)) return false;
        if (category !== "all" && eventCategory !== category.toLowerCase()) return false;
        if (dateRange !== "all" && year !== dateRange) return false;

        return true;
    });

    renderEvents();
}
function renderEvents() {
    const grid = id("eventsGrid");
    if (!grid) return;

    if (!filteredEvents.length) {
        grid.innerHTML = `
            <div class="empty-state">
                <h3>No events found</h3>
                <p>Try adjusting your search or filters</p>
            </div>`;
        return;
    }

    grid.innerHTML = filteredEvents.map(e => {
        const img = e.img || "assets/tech-summit.jpeg";
        const date = formatDate(e.date);
        const title = e.title || "Untitled Event";
        const link = "events.html?date=" + e.date;

        return `
        <div class="event-card" onclick="window.location.href='${link}'">
            <img src="${img}" class="event-card-image"
                 onerror="this.src='assets/tech-summit.jpeg'">
            <div class="event-card-content">
                <h3>${title}</h3>
                <p>${date}</p>
            </div>
        </div>`;
    }).join("");
}

function formatDate(d) {
    if (!d) return "Date TBA";
    try {
        return new Date(d).toLocaleDateString("en-US", {
            month: "short", day: "numeric", year: "numeric"
        });
    } catch {
        return d;
    }
}



document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
    setupFilters();
    renderEvents();
});
