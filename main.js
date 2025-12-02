// ===============================
// DEFAULT EVENTS
// ===============================
const defaultEvents = [
    { title: "Sports Day", date: "2025-12-08", time: "2:00 PM", desc: "Annual university sports competitions.", img: "assets/soccer-team.jpg" },
    { title: "Robotic Surgery Demo", date: "2025-12-11", time: "3:00 PM", desc: "Robotic-assisted surgical demo.", img: "assets/Ai-in-medicine.jpg" },
    { title: "Photography Workshop", date: "2025-12-14", time: "10:00 AM", desc: "Camera basics & composition.", img: "assets/photography.jpg" },
    { title: "Baking Marathon", date: "2025-12-20", time: "9:00 AM", desc: "All-day baking event.", img: "assets/baking.jpg" },
    { title: "Networking Night", date: "2025-12-24", time: "6:00 PM", desc: "Meet recruiters, CV reviews.", img: "assets/tech-summit.jpeg" }
];

let events = [];

// ===============================
// LOCAL STORAGE LOADING
// ===============================
function loadEventsFromStorage() {
    try {
        const stored = JSON.parse(localStorage.getItem("events"));
        if (Array.isArray(stored) && stored.some(e => e.time)) {
            events = stored;
            return;
        }
    } catch { }

    events = [...defaultEvents];
    saveEventsToStorage();
}

function saveEventsToStorage() {
    try {
        localStorage.setItem("events", JSON.stringify(events));
    } catch { }
}

function resetEventsToDefaults() {
    events = [...defaultEvents];
    saveEventsToStorage();
    alert("Events reset to defaults. Reloading...");
    location.reload();
}

loadEventsFromStorage();

// ===============================
// CALENDAR RENDERING
// ===============================
let currentDate = new Date();
const today = new Date();

function renderCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    const y = currentDate.getFullYear();
    const m = currentDate.getMonth();

    document.getElementById("monthLabel").textContent =
        currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    // Day headers
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
        const header = document.createElement("div");
        header.className = "day-header";
        header.textContent = day;
        calendar.appendChild(header);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const lastDay = new Date(y, m + 1, 0).getDate();

    // Empty cells
    calendar.innerHTML += "<div></div>".repeat(firstDay);

    // Day cells
    for (let d = 1; d <= lastDay; d++) {
        const dateStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const div = document.createElement("div");
        div.className = "day";
        div.innerHTML = `<strong>${d}</strong>`;

        // highlight today
        if (d === today.getDate() && m === today.getMonth() && y === today.getFullYear()) {
            div.classList.add("active");
        }

        div.onclick = () =>
            document.querySelectorAll(".day").forEach(x => x.classList.remove("active")) ||
            div.classList.add("active");

        // add events inside day cell
        events.filter(e => e.date === dateStr).forEach(ev => {
            const eDiv = document.createElement("div");
            eDiv.className = "event";
            eDiv.textContent = ev.title;
            eDiv.onclick = (e) => (e.stopPropagation(), openPopup(ev));
            div.appendChild(eDiv);
        });

        calendar.appendChild(div);
    }
}

// ===============================
// SEARCH
// ===============================
document.getElementById("searchInput").addEventListener("input", function () {
    const t = this.value.toLowerCase();
    const match = events.find(e => e.title.toLowerCase().includes(t));

    if (match) {
        currentDate = new Date(match.date);
        renderCalendar();
        highlightDate(match.date);
    }
});

function highlightDate(dateStr) {
    const day = parseInt(dateStr.split("-")[2]);
    document.querySelectorAll(".day").forEach(cell => cell.classList.remove("active"));

    [...document.querySelectorAll(".day")].find(cell => {
        const n = cell.querySelector("strong");
        return n && parseInt(n.textContent) === day;
    })?.classList.add("active");
}

// ===============================
// NAVIGATION
// ===============================
document.getElementById("todayBtn").onclick = () => {
    currentDate = new Date();
    renderCalendar();
};

document.getElementById("prevBtn").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
};

document.getElementById("nextBtn").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
};

document.getElementById("resetBtn").onclick = () =>
    confirm("Restore default events?") && resetEventsToDefaults();

// ===============================
// POPUP
// ===============================
const popupBg = document.getElementById("popupBg");
const popupImg = document.getElementById("popupImg");
const popupTitle = document.getElementById("popupTitle");
const popupDate = document.getElementById("popupDate");
const popupDesc = document.getElementById("popupDesc");
const reserveBtn = document.getElementById("reserveBtn");
const closeBtn = document.getElementById("closeBtn");

function formatDateYMD(d, t) {
    const parts = d.split("-").map(Number);
    if (parts.length !== 3) return d;

    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    const text = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    return t ? `${text} • ${t}` : text;
}

function openPopup(ev) {
    popupTitle.textContent = ev.title;
    popupDate.textContent = formatDateYMD(ev.date, ev.time);
    popupDesc.textContent = ev.desc;

    if (ev.img) {
        popupImg.src = ev.img;
        popupImg.style.display = "block";
    } else {
        popupImg.style.display = "none";
    }

    popupBg.style.display = "flex";
    document.body.style.overflow = "hidden";
}

closeBtn.onclick = () => {
    popupBg.style.display = "none";
    document.body.style.overflow = "auto";
};

reserveBtn.onclick = () => {
    alert(`Reservation requested for "${popupTitle.textContent}".`);
    popupBg.style.display = "none";
    document.body.style.overflow = "auto";
};

popupBg.onclick = e => {
    if (e.target === popupBg) {
        popupBg.style.display = "none";
        document.body.style.overflow = "auto";
    }
};

// initial render
renderCalendar();
