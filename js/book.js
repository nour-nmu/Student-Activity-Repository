// -----------------------------
// ADD EVENT FORM (Simplified)
// -----------------------------
(function () {
    const form = document.getElementById("bookForm");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const title = id("name").value.trim();
        const type = id("event").value;
        const desc = id("description").value.trim();
        const location = id("location").value.trim();
        const datetime = id("date").value;  // 2025-12-15T14:30
        const other = id("other").value.trim();
        const image = id("eventImage");

        if (!title || !datetime) {
            alert("Please fill required fields");
            return;
        }

        // Split datetime → date + time
        const [d, t] = datetime.split("T");
        let formattedTime = "";

        if (t) {
            const [h, m] = t.split(":").map(Number);
            const ampm = h >= 12 ? "PM" : "AM";
            const hour12 = h % 12 || 12;
            formattedTime = `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
        }

        const newEvent = {
            title,
            date: d,
            time: formattedTime,
            desc,
            location,
            type,
            other,
            img: ""
        };

        // Save event to localStorage
        const saveEvent = () => {
            try {
                const raw = localStorage.getItem("events");
                const arr = raw ? JSON.parse(raw) : [];
                arr.push(newEvent);
                localStorage.setItem("events", JSON.stringify(arr));
                alert("Event submitted — redirecting...");
                window.location.href = "events.html";
            } catch {
                alert("Failed to save event.");
            }
        };

        // Handle optional image upload
        if (image.files && image.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                newEvent.img = e.target.result;
                saveEvent();
            };
            reader.onerror = () => alert("Could not load image");
            reader.readAsDataURL(image.files[0]);
        } else {
            saveEvent();
        }
    });

    function id(x) {
        return document.getElementById(x);
    }
})();
