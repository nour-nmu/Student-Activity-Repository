# Student Activities Repository (SAR) - New Mansoura University

A comprehensive web application for managing and exploring student events, activities, and clubs at New Mansoura University. This platform allows students to discover events, book new activities, and browse through past event archives.

## 🌟 Features

### 📅 Events Calendar
- **Interactive Calendar View**: Navigate through months to view all scheduled events
- **Event Display**: Events are displayed as colored tags on their respective dates
- **Event Details**: Click on any event to view detailed information including description, time, and location
- **Search Functionality**: Search for events by name to quickly find what you're looking for
- **Month Navigation**: Easy navigation between months with previous/next buttons
- **Today Button**: Quickly jump to the current month
- **View Toggles**: Switch between Month, Week, and Year views (Month view currently active)

### 📚 Events Archive
- **Browse Past Events**: Access materials and information from past student events
- **Advanced Filtering**: 
  - Search by event name
  - Filter by date range (2021-2025)
  - Filter by category (Lecture, Seminar, Workshop, Club Meeting, Event)
  - Filter by faculty (Engineering, Medicine, Arts, Science, Business)
- **Custom Date Range**: Select specific date ranges for more precise filtering
- **Event Cards**: Beautiful card-based layout displaying event images, titles, and dates
- **Direct Navigation**: Click any event card to jump directly to its date in the calendar

### 📝 Book an Event
- **Comprehensive Form**: Submit new events with detailed information
- **Event Details**: Name, type, description, and optional image upload
- **Logistics**: Specify location, date, and time
- **Audience & Resources**: Define target audience and required resources
- **Resource Selection**: Choose from projector, whiteboard, sound system, microphones, podium, catering table, or specify custom resources
- **Automatic Storage**: Events are automatically saved to the calendar

### 🏠 Home Page
- **Welcome Section**: Discover student life at NMU
- **Featured Events**: View highlighted upcoming events
- **Quick Navigation**: Easy access to all platform features

### 📞 Contact Us
- **Support Information**: Get help and contact university support
- **Social Links**: Connect via LinkedIn, Facebook, and Instagram

## 📁 Project Structure

```
web project/
│
├── index.html              # Home page
├── events.html             # Events calendar page
├── archive.html            # Events archive page
├── bookevent.html          # Book an event form
├── contact-us.html         # Contact page
├── Login.html              # Login page
├── register.html           # Registration page
│
├── css/
│   ├── main.css           # Main navigation and shared styles
│   ├── style.css          # Home page styles
│   ├── event.css          # Calendar page styles
│   ├── archive.css        # Archive page styles
│   ├── book.css           # Booking form styles
│   ├── contact.css         # Contact page styles
│   └── registeration.css  # Login/Register styles
│
├── js/
│   ├── app.js             # Navigation active state handler
│   ├── event.js           # Calendar functionality
│   ├── archive.js         # Archive page functionality
│   └── book.js            # Event booking form handler
│
└── assets/
    ├── [images]           # Event images and icons
    └── [icons]            # UI icons and graphics
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required - runs entirely in the browser

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! The application runs entirely client-side

### Usage

#### Viewing Events
1. Navigate to **Events Calendar** from the main menu
2. Browse events by month using the navigation arrows
3. Click on any event to view details
4. Use the search bar to find specific events

#### Booking an Event
1. Click **Book an Event** in the navigation
2. Fill out the event form with all required information
3. Upload an optional event image
4. Select required resources
5. Click **Submit** to add the event to the calendar

#### Browsing Archive
1. Go to **Events Archive** from the navigation
2. Use filters to narrow down events:
   - Enter search terms in the search bar
   - Select a date range
   - Choose a category
   - Filter by faculty
3. Click on any event card to view it in the calendar

## 💾 Data Storage

This application uses **localStorage** to store events in your browser. This means:
- ✅ Events persist between page reloads
- ✅ No server or database required
- ✅ Data is stored locally on your device
- ⚠️ Data is browser-specific (different browsers have separate storage)
- ⚠️ Clearing browser data will remove events

### Managing Events

- **Default Events**: The application comes with 5 sample events
- **Adding Events**: New events are automatically saved when submitted
- **Resetting Events**: Use the "Reset" button on the calendar page to restore default events

## 🎨 Design Features

- **Dark Theme**: Modern dark color scheme for comfortable viewing
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Color-Coded Events**: Events are displayed with different colors based on type
- **Smooth Animations**: Transitions and hover effects for better UX
- **Intuitive Navigation**: Easy-to-use interface with clear navigation

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and layout
- **JavaScript (Vanilla)**: Functionality and interactivity
- **localStorage API**: Client-side data persistence

## 📝 Code Style

The codebase is written with **beginner-friendly** principles:
- Simple, clear variable names
- Extensive comments explaining functionality
- Step-by-step organization
- No complex frameworks or dependencies
- Easy to understand and modify

## 🔧 Customization

### Adding Default Events
Edit `js/event.js` and modify the `defaultEvents` array:

```javascript
const defaultEvents = [
    { 
        title: "Your Event Name", 
        date: "2025-12-25", 
        time: "2:00 PM", 
        desc: "Event description", 
        img: "assets/your-image.jpg" 
    },
    // Add more events...
];
```

### Changing Colors
Modify the CSS files in the `css/` directory to customize colors, fonts, and styling.

### Adding New Pages
1. Create a new HTML file
2. Include the navigation structure from other pages
3. Link to `css/main.css` for consistent styling
4. Add any page-specific CSS in a new file or existing one

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🤝 Contributing

This is a university project for New Mansoura University. For suggestions or improvements, please contact the development team.

## 📧 Contact

- **Email**: nourelghorouri9@gmail.com
- **Location**: International Coastal Road, New Mansoura City, Dakahlia Governate, Egypt
- **Social Media**: 
  - [LinkedIn](https://www.linkedin.com/in/nour-elghorouri/)
  - [Facebook](https://www.facebook.com/eng.nourelghorouri)
  - [Instagram](https://www.instagram.com/eng.nourelghorouri/)

## 📄 License

This project is developed for the New Mansoura University web project.

## 🎯 Future Enhancements

Potential features for future versions:
- User authentication system
- Event registration/RSVP functionality
- Email notifications
- Event categories and tags
- Export calendar to external formats
- Integration with external calendar apps
- Admin panel for event management
- User profiles and activity tracking

---

**Developed for New Mansoura University** 🎓

*Last Updated: 2025*

