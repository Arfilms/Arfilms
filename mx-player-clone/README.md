# MX Player Clone

A modern video streaming application built with React and Vite that mimics the look and feel of MX Player.

## Features

- **Dark Theme UI**: MX Player-inspired dark interface
- **Video Grid/List View**: Toggle between grid and list views for video browsing
- **Search Functionality**: Search through your video library
- **Folder Browser**: Organize videos by folders (Movies, TV Series, Documentaries, etc.)
- **Video Player**: Built-in video player with playback controls
- **Navigation Tabs**: Home, All Videos, Folders, Recent, and Favorites sections
- **Responsive Design**: Works on different screen sizes

## Interface Components

### Sidebar Navigation
- Home
- All Videos
- Folders
- Recent
- Favorites

### Header
- Search bar with real-time filtering
- View mode toggle (Grid/List)
- Settings and action buttons

### Video Player
- Play/Pause controls
- Skip forward/backward
- Progress bar
- Volume control
- Fullscreen support (placeholder)

### Video Library
- Grid view with video thumbnails
- List view with detailed information
- Video metadata (duration, file size)
- Folder organization

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful icon library
- **CSS3**: Custom styling with dark theme
- **JavaScript ES6+**: Modern JavaScript features

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mx-player-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
mx-player-clone/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## Features in Detail

### Video Management
- Sample video library with metadata
- Folder-based organization
- Recent videos tracking
- Favorites system

### User Interface
- MX Player-inspired design
- Dark theme with blue accents
- Smooth animations and transitions
- Responsive grid layout

### Video Player Controls
- Play/Pause functionality
- Progress tracking
- Time display
- Volume controls
- Media controls (skip, rewind)

## Customization

The app uses CSS custom properties for easy theming. You can modify the color scheme in `App.css`:

```css
/* Main colors */
--bg-primary: #0d1117;
--bg-secondary: #161b22;
--border-color: #30363d;
--text-primary: #f0f6fc;
--text-secondary: #7d8590;
--accent-color: #58a6ff;
```

## Future Enhancements

- [ ] Real video file support
- [ ] Subtitle support
- [ ] Playlist creation and management
- [ ] Settings panel
- [ ] Keyboard shortcuts
- [ ] Fullscreen video player
- [ ] Video thumbnails generation
- [ ] Local file system integration
- [ ] Video format support (MP4, MKV, AVI, etc.)
- [ ] Audio track selection
- [ ] Playback speed control

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by MX Player's user interface
- Icons provided by Lucide React
- Built with modern React and Vite
