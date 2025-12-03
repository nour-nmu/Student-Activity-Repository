// ============================================
// ARCHIVE PAGE - SIMPLE BEGINNER-FRIENDLY CODE
// ============================================

// Variables to store our data
var allEvents = [];           // All events from storage
var filteredEvents = [];      // Events after filtering

// ============================================
// STEP 1: LOAD EVENTS FROM STORAGE
// ============================================
function loadEvents() {
    // Try to get events from browser storage
    try {
        var storedEvents = localStorage.getItem('events');
        
        // If we found events, use them
        if (storedEvents) {
            // Convert the text back into an array
            allEvents = JSON.parse(storedEvents);
            
            // Make sure each event has all the fields we need
            for (var i = 0; i < allEvents.length; i++) {
                var event = allEvents[i];
                
                // If event doesn't have a category, use its type or default to 'event'
                if (!event.category) {
                    if (event.type) {
                        event.category = event.type;
                    } else {
                        event.category = 'event';
                    }
                }
                
                // If event doesn't have a faculty, guess it from the title/description
                if (!event.faculty) {
                    event.faculty = guessFaculty(event);
                }
                
                // If event doesn't have a date, use today's date
                if (!event.date) {
                    var today = new Date();
                    event.date = today.getFullYear() + '-' + 
                                 String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                                 String(today.getDate()).padStart(2, '0');
                }
            }
            
            // Sort events by date (newest first)
            allEvents.sort(function(a, b) {
                var dateA = new Date(a.date);
                var dateB = new Date(b.date);
                return dateB - dateA; // Newest first
            });
        } else {
            // No events found, start with empty array
            allEvents = [];
        }
    } catch (error) {
        // If something went wrong, start with empty array
        console.log('Error loading events:', error);
        allEvents = [];
    }
    
    // Start with all events showing (no filters yet)
    filteredEvents = allEvents.slice(); // Copy the array
}

// ============================================
// STEP 2: GUESS FACULTY FROM EVENT INFO
// ============================================
function guessFaculty(event) {
    // Get the event title and description in lowercase for easier matching
    var title = (event.title || '').toLowerCase();
    var description = (event.desc || '').toLowerCase();
    var location = (event.location || '').toLowerCase();
    
    // Check if it's engineering related
    if (title.indexOf('engineering') !== -1 || 
        title.indexOf('tech') !== -1 || 
        title.indexOf('code') !== -1 ||
        description.indexOf('engineering') !== -1 ||
        location.indexOf('engineering') !== -1) {
        return 'engineering';
    }
    
    // Check if it's medicine related
    if (title.indexOf('medicine') !== -1 || 
        title.indexOf('medical') !== -1 || 
        title.indexOf('surgery') !== -1 ||
        description.indexOf('medicine') !== -1 ||
        description.indexOf('medical') !== -1) {
        return 'medicine';
    }
    
    // Check if it's arts related
    if (title.indexOf('art') !== -1 || 
        title.indexOf('culture') !== -1 || 
        title.indexOf('photography') !== -1 ||
        description.indexOf('art') !== -1 ||
        description.indexOf('culture') !== -1) {
        return 'arts';
    }
    
    // Check if it's science related
    if (title.indexOf('science') !== -1 || 
        title.indexOf('research') !== -1 ||
        description.indexOf('science') !== -1) {
        return 'science';
    }
    
    // Check if it's business related
    if (title.indexOf('business') !== -1 || 
        title.indexOf('networking') !== -1 ||
        description.indexOf('business') !== -1) {
        return 'business';
    }
    
    // Default to engineering if we can't figure it out
    return 'engineering';
}

// ============================================
// STEP 3: SET UP BUTTON CLICKS AND INPUTS
// ============================================
function setupEventListeners() {
    // Get all the input fields and buttons
    var searchInput = document.getElementById('searchInput');
    var dateRangeFilter = document.getElementById('dateRangeFilter');
    var categoryFilter = document.getElementById('categoryFilter');
    var facultyFilter = document.getElementById('facultyFilter');
    var applyDateRangeBtn = document.getElementById('applyDateRange');
    
    // When user types in search box, filter events
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilters();
        });
    }
    
    // When user changes date range filter
    if (dateRangeFilter) {
        dateRangeFilter.addEventListener('change', function() {
            var customDateDiv = document.getElementById('customDateRange');
            if (this.value === 'custom') {
                // Show custom date inputs
                customDateDiv.style.display = 'flex';
            } else {
                // Hide custom date inputs and apply filter
                customDateDiv.style.display = 'none';
                applyFilters();
            }
        });
    }
    
    // When user changes category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // When user changes faculty filter
    if (facultyFilter) {
        facultyFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // When user clicks "Apply" for custom date range
    if (applyDateRangeBtn) {
        applyDateRangeBtn.addEventListener('click', function() {
            applyFilters();
        });
    }
    
    // Check every second if new events were added (so archive updates automatically)
    setInterval(function() {
        var currentEvents = localStorage.getItem('events');
        var currentEventsString = JSON.stringify(allEvents);
        if (currentEvents && currentEvents !== currentEventsString) {
            loadEvents();
            applyFilters();
        }
    }, 1000);
}

// ============================================
// STEP 4: APPLY ALL FILTERS
// ============================================
function applyFilters() {
    // Get what the user typed/selected
    var searchText = document.getElementById('searchInput').value.toLowerCase();
    var dateRange = document.getElementById('dateRangeFilter').value;
    var category = document.getElementById('categoryFilter').value;
    var faculty = document.getElementById('facultyFilter').value;
    var startDate = document.getElementById('startDate').value;
    var endDate = document.getElementById('endDate').value;
    
    // Start with empty array for filtered events
    filteredEvents = [];
    
    // Go through each event and check if it matches the filters
    for (var i = 0; i < allEvents.length; i++) {
        var event = allEvents[i];
        var shouldShow = true; // Assume we'll show it
        
        // Check search filter
        if (searchText) {
            var eventTitle = (event.title || '').toLowerCase();
            if (eventTitle.indexOf(searchText) === -1) {
                shouldShow = false; // Title doesn't match search
            }
        }
        
        // Check category filter
        if (category !== 'all') {
            if (event.category !== category) {
                shouldShow = false; // Category doesn't match
            }
        }
        
        // Check faculty filter
        if (faculty !== 'all') {
            if (event.faculty !== faculty) {
                shouldShow = false; // Faculty doesn't match
            }
        }
        
        // Check date range filter
        if (dateRange === 'custom') {
            // Check if event date is within custom range
            if (startDate && event.date < startDate) {
                shouldShow = false; // Event is before start date
            }
            if (endDate && event.date > endDate) {
                shouldShow = false; // Event is after end date
            }
        } else if (dateRange !== 'all') {
            // Check if event year matches selected year
            var eventYear = '';
            if (event.date) {
                eventYear = event.date.split('-')[0]; // Get year (first part)
            }
            if (eventYear !== dateRange) {
                shouldShow = false; // Year doesn't match
            }
        }
        
        // If event passed all filters, add it to filtered list
        if (shouldShow) {
            filteredEvents.push(event);
        }
    }
    
    // Show the filtered events
    renderEvents();
}

// ============================================
// STEP 5: FORMAT DATE FOR DISPLAY
// ============================================
function formatDate(dateString) {
    // If no date, return a message
    if (!dateString) {
        return 'Date TBA';
    }
    
    try {
        // Create a date object
        var date = new Date(dateString + 'T00:00:00');
        
        // Format it nicely (e.g., "Oct 15, 2023")
        var options = {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    } catch (error) {
        // If something went wrong, just return the original string
        return dateString;
    }
}

// ============================================
// STEP 6: SHOW EVENTS ON THE PAGE
// ============================================
function renderEvents() {
    // Get the container where we'll put the events
    var grid = document.getElementById('eventsGrid');
    if (!grid) {
        return; // Can't find the container, stop here
    }
    
    // If no events to show, display a message
    if (filteredEvents.length === 0) {
        grid.innerHTML = '<div class="empty-state">' +
                        '<h3>No events found</h3>' +
                        '<p>Try adjusting your search or filters</p>' +
                        '</div>';
        return;
    }
    
    // Build HTML for each event card - show all filtered events
    var html = '';
    for (var i = 0; i < filteredEvents.length; i++) {
        var event = filteredEvents[i];
        
        // Get image or use default
        var imageSrc = event.img || 'assets/tech-summit.jpeg';
        
        // Format the date
        var formattedDate = formatDate(event.date);
        
        // Get event title or use default
        var eventTitle = event.title || 'Untitled Event';
        
        // Build the HTML for this event card
        // Pass the event date as URL parameter so calendar can navigate to it
        var eventDate = event.date || '';
        var calendarUrl = 'events.html';
        if (eventDate) {
            calendarUrl = 'events.html?date=' + eventDate;
        }
        html += '<div class="event-card" onclick="window.location.href=\'' + calendarUrl + '\'">';
        html += '<img src="' + imageSrc + '" alt="' + eventTitle + '" class="event-card-image" ';
        html += 'onerror="this.src=\'assets/tech-summit.jpeg\'">';
        html += '<div class="event-card-content">';
        html += '<h3 class="event-card-title">' + eventTitle + '</h3>';
        html += '<p class="event-card-date">' + formattedDate + '</p>';
        html += '</div>';
        html += '</div>';
    }
    
    // Put the HTML into the page
    grid.innerHTML = html;
}

// ============================================
// STEP 7: START EVERYTHING WHEN PAGE LOADS
// ============================================
function startArchive() {
    loadEvents();              // Load events from storage
    setupEventListeners();      // Set up button clicks
    renderEvents();             // Show events on page
}

// Wait for page to finish loading, then start
if (document.readyState === 'loading') {
    // Page is still loading, wait for it
    document.addEventListener('DOMContentLoaded', startArchive);
} else {
    // Page already loaded, start now
    startArchive();
}
