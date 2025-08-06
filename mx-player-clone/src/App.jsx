import React, { useState } from 'react'
import './App.css'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Settings, 
  Search, 
  Grid3X3, 
  List, 
  Folder, 
  Home, 
  Clock, 
  Star, 
  PlayCircle,
  FolderOpen,
  FileVideo
} from 'lucide-react'

// Sample video data
const sampleVideos = [
  {
    id: 1,
    title: "Sample Video 1.mp4",
    duration: "1:45:30",
    size: "2.1 GB",
    path: "/videos/sample1.mp4"
  },
  {
    id: 2,
    title: "Movie Example.mkv",
    duration: "2:15:45",
    size: "4.8 GB",
    path: "/videos/movie.mkv"
  },
  {
    id: 3,
    title: "Series S01E01.mp4",
    duration: "42:15",
    size: "1.2 GB",
    path: "/videos/series/s01e01.mp4"
  },
  {
    id: 4,
    title: "Documentary.mkv",
    duration: "1:28:30",
    size: "3.5 GB",
    path: "/videos/docs/documentary.mkv"
  },
  {
    id: 5,
    title: "Short Film.mp4",
    duration: "15:20",
    size: "456 MB",
    path: "/videos/shorts/film.mp4"
  },
  {
    id: 6,
    title: "Music Video.mp4",
    duration: "4:32",
    size: "120 MB",
    path: "/videos/music/video.mp4"
  }
]

const folders = [
  { name: "Movies", path: "/videos/movies", count: 25 },
  { name: "TV Series", path: "/videos/series", count: 48 },
  { name: "Documentaries", path: "/videos/docs", count: 12 },
  { name: "Music Videos", path: "/videos/music", count: 36 },
  { name: "Short Films", path: "/videos/shorts", count: 8 },
]

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'videos', label: 'All Videos', icon: PlayCircle },
    { id: 'folders', label: 'Folders', icon: Folder },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'favorites', label: 'Favorites', icon: Star },
  ]

  return (
    <div className="sidebar">
      <div className="logo">
        <PlayCircle size={28} />
        MX Player Clone
      </div>
      <nav>
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} />
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  )
}

function Header({ searchTerm, setSearchTerm, viewMode, setViewMode }) {
  return (
    <div className="header">
      <div className="search-container">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search videos..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="header-actions">
        <button 
          className={`action-btn ${viewMode === 'grid' ? 'active' : ''}`}
          onClick={() => setViewMode('grid')}
        >
          <Grid3X3 size={20} />
        </button>
        <button 
          className={`action-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          <List size={20} />
        </button>
        <button className="action-btn">
          <Settings size={20} />
        </button>
      </div>
    </div>
  )
}

function VideoCard({ video, onPlay }) {
  return (
    <div className="video-card" onClick={() => onPlay(video)}>
      <div className="video-thumbnail">
        <div className="play-icon">
          <Play size={24} />
        </div>
      </div>
      <div className="video-info">
        <div className="video-title">{video.title}</div>
        <div className="video-meta">
          <span>{video.duration}</span>
          <span>{video.size}</span>
        </div>
      </div>
    </div>
  )
}

function VideoPlayer({ currentVideo, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(30)

  if (!currentVideo) return null

  return (
    <div className="video-player-container">
      <div className="video-player">
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: 'white'
        }}>
          {currentVideo.title}
          <br />
          <small style={{ fontSize: '16px', opacity: 0.7 }}>Video Player Placeholder</small>
        </div>
      </div>
      <div className="player-controls">
        <div className="control-group">
          <button className="control-btn">
            <SkipBack size={20} />
          </button>
          <button 
            className="control-btn"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="control-btn">
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="control-group">
          <div className="time-display">15:30 / 1:45:30</div>
          <button className="control-btn">
            <Volume2 size={20} />
          </button>
          <button className="control-btn" onClick={onClose}>
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

function FolderBrowser() {
  return (
    <div className="folder-browser">
      <div className="folder-header">
        <FolderOpen size={20} />
        Browse Folders
      </div>
      {folders.map(folder => (
        <div key={folder.path} className="folder-item">
          <Folder size={18} />
          <span style={{ flex: 1 }}>{folder.name}</span>
          <span style={{ color: '#7d8590', fontSize: '14px' }}>
            {folder.count} videos
          </span>
        </div>
      ))}
    </div>
  )
}

function VideoGrid({ videos, onPlay, viewMode }) {
  if (viewMode === 'list') {
    return (
      <div style={{ background: '#161b22', borderRadius: '8px', border: '1px solid #30363d' }}>
        {videos.map(video => (
          <div key={video.id} className="folder-item" onClick={() => onPlay(video)}>
            <FileVideo size={18} />
            <span style={{ flex: 1 }}>{video.title}</span>
            <span style={{ color: '#7d8590', fontSize: '14px', marginRight: '20px' }}>
              {video.duration}
            </span>
            <span style={{ color: '#7d8590', fontSize: '14px' }}>
              {video.size}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="video-grid">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} onPlay={onPlay} />
      ))}
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [currentVideo, setCurrentVideo] = useState(null)

  const filteredVideos = sampleVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePlayVideo = (video) => {
    setCurrentVideo(video)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <h2 className="section-title">
              <Home size={24} />
              Welcome to MX Player Clone
            </h2>
            {currentVideo && (
              <VideoPlayer 
                currentVideo={currentVideo} 
                onClose={() => setCurrentVideo(null)}
              />
            )}
            <FolderBrowser />
            <h3 className="section-title">
              <PlayCircle size={20} />
              Recently Added
            </h3>
            <VideoGrid 
              videos={filteredVideos.slice(0, 4)} 
              onPlay={handlePlayVideo}
              viewMode={viewMode}
            />
          </div>
        )
      case 'videos':
        return (
          <div>
            <h2 className="section-title">
              <PlayCircle size={24} />
              All Videos ({filteredVideos.length})
            </h2>
            {currentVideo && (
              <VideoPlayer 
                currentVideo={currentVideo} 
                onClose={() => setCurrentVideo(null)}
              />
            )}
            <VideoGrid 
              videos={filteredVideos} 
              onPlay={handlePlayVideo}
              viewMode={viewMode}
            />
          </div>
        )
      case 'folders':
        return (
          <div>
            <h2 className="section-title">
              <Folder size={24} />
              Browse by Folders
            </h2>
            <FolderBrowser />
            {filteredVideos.length > 0 && (
              <>
                <h3 className="section-title">
                  <FileVideo size={20} />
                  Videos in Selected Folder
                </h3>
                <VideoGrid 
                  videos={filteredVideos} 
                  onPlay={handlePlayVideo}
                  viewMode={viewMode}
                />
              </>
            )}
          </div>
        )
      case 'recent':
        return (
          <div>
            <h2 className="section-title">
              <Clock size={24} />
              Recently Played
            </h2>
            {currentVideo && (
              <VideoPlayer 
                currentVideo={currentVideo} 
                onClose={() => setCurrentVideo(null)}
              />
            )}
            <VideoGrid 
              videos={filteredVideos.slice(0, 3)} 
              onPlay={handlePlayVideo}
              viewMode={viewMode}
            />
          </div>
        )
      case 'favorites':
        return (
          <div>
            <h2 className="section-title">
              <Star size={24} />
              Favorite Videos
            </h2>
            {currentVideo && (
              <VideoPlayer 
                currentVideo={currentVideo} 
                onClose={() => setCurrentVideo(null)}
              />
            )}
            {filteredVideos.length > 0 ? (
              <VideoGrid 
                videos={filteredVideos.slice(0, 2)} 
                onPlay={handlePlayVideo}
                viewMode={viewMode}
              />
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">⭐</div>
                <h3>No Favorite Videos</h3>
                <p>Add videos to favorites to see them here</p>
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default App
