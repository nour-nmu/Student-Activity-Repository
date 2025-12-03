// Handle form submission: save a new event to localStorage and redirect to events page
(function () {
    const form = document.getElementById('bookForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('name').value.trim();
        const type = document.getElementById('event').value;
        const desc = document.getElementById('description').value.trim();
        const location = document.getElementById('location').value.trim();
        const datetime = document.getElementById('date').value; // e.g. 2025-12-15T14:30
        const other = document.getElementById('other').value.trim();
        const imageInput = document.getElementById('eventImage');

        if (!title || !datetime) {
            alert('Please fill required fields');
            return;
        }

        // Convert datetime-local to YYYY-MM-DD (local date) and extract time
        const dateOnly = datetime.split('T')[0];
        const timeOnly = datetime.split('T')[1]; // HH:MM

        // Convert 24-hour time to 12-hour format with AM/PM
        let displayTime = '';
        if (timeOnly) {
            const [hours, minutes] = timeOnly.split(':').map(Number);
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            displayTime = `${displayHours}:${String(minutes).padStart(2, '0')} ${ampm}`;
        }

        // Build event object (minimal fields used by calendar)
        const newEvent = {
            title: title,
            date: dateOnly,
            time: displayTime,
            desc: desc || '',
            location: location || '',
            type: type || 'event',
            other: other || '',
            img: ''
        };

        // Handle image upload: convert to data URL
        if (imageInput.files && imageInput.files[0]) {
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onload = function (event) {
                newEvent.img = event.target.result; // data URL string

                try {
                    const raw = localStorage.getItem('events');
                    let arr = [];
                    if (raw) {
                        arr = JSON.parse(raw);
                        if (!Array.isArray(arr)) arr = [];
                    }
                    arr.push(newEvent);
                    localStorage.setItem('events', JSON.stringify(arr));

                    // Confirmation and redirect to events page where calendar reads localStorage
                    alert('Event submitted with image — redirecting to calendar');
                    window.location.href = 'events.html';
                } catch (err) {
                    console.error('Failed to save event', err);
                    alert('Failed to save event. See console for details.');
                }
            };

            reader.onerror = function () {
                alert('Failed to read image file.');
            };

            reader.readAsDataURL(file);
        } else {
            // No image, save without it
            try {
                const raw = localStorage.getItem('events');
                let arr = [];
                if (raw) {
                    arr = JSON.parse(raw);
                    if (!Array.isArray(arr)) arr = [];
                }
                arr.push(newEvent);
                localStorage.setItem('events', JSON.stringify(arr));

                // Confirmation and redirect to events page where calendar reads localStorage
                alert('Event submitted — redirecting to calendar');
                window.location.href = 'events.html';
            } catch (err) {
                console.error('Failed to save event', err);
                alert('Failed to save event. See console for details.');
            }
        }
    });
})();