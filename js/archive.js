// -----------------------------
// ARCHIVE PAGE (Simplified, No Faculty Filter)
// -----------------------------

let allEvents = [];
let filteredEvents = [];

// -----------------------------
// LOAD EVENTS
// -----------------------------
function loadEvents() {
    try {
        const stored = localStorage.getItem("events");
        allEvents = stored ? JSON.parse(stored) : [];

        // Fix missing fields
        allEvents.forEach(e => {
            e.category = e.category || e.type || 'event';

            if (!e.date) {
                const t = new Date();
                e.date = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`;
            }
        });

        // Newest first
        allEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch {
        allEvents = [];
    }

    filteredEvents = [...allEvents];
}

// -----------------------------
// SETUP FILTERS
// -----------------------------
function setupFilters() {
    const search = id("searchInput");
    const dateRange = id("dateRangeFilter");
    const category = id("categoryFilter");
    const applyDate = id("applyDateRange");

    if (search) search.addEventListener("input", applyFilters);

    if (category) category.addEventListener("change", applyFilters);
    if (applyDate) applyDate.addEventListener("click", applyFilters);

    // Auto-refresh if events updated
    setInterval(() => {
        const stored = localStorage.getItem("events");
        if (stored && stored !== JSON.stringify(allEvents)) {
            loadEvents();
            applyFilters();
        }
    }, 1000);
}

// -----------------------------
// APPLY FILTERS
// -----------------------------
function applyFilters() {
    const search = id("searchInput").value.toLowerCase();
    const dateRange = id("dateRangeFilter").value;
    const category = id("categoryFilter").value;
    const start = id("startDate").value;
    const end = id("endDate").value;

    filteredEvents = allEvents.filter(e => {
        const title = (e.title || "").toLowerCase();
        const year = e.date.split("-")[0];

        if (search && !title.includes(search)) return false;
        if (category !== "all" && e.category !== category) return false;

        if (dateRange === "custom") {
            if (start && e.date < start) return false;
            if (end && e.date > end) return false;
        } else if (dateRange !== "all" && year !== dateRange) {
            return false;
        }

        return true;
    });

    renderEvents();
}

// -----------------------------
// RENDER EVENTS
// -----------------------------
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

// -----------------------------
// HELPER: FORMAT DATE
// -----------------------------
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

// -----------------------------
// HELPER: SHORTER document.getElementById
// -----------------------------
function id(i) {
    return document.getElementById(i);
}

// -----------------------------
// START
// -----------------------------
function startArchive() {
    loadEvents();
    setupFilters();
    renderEvents();
}

document.addEventListener("DOMContentLoaded", startArchive);
