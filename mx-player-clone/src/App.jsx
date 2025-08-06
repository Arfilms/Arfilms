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
  FileVideo,
  Plus,
  User,
  Filter,
  Shuffle,
  Download,
  Share2,
  Heart,
  ThumbsUp,
  MoreHorizontal
} from 'lucide-react'

// Enhanced sample video data with streaming content
const sampleVideos = [
  {
    id: 1,
    title: "Big Buck Bunny",
    description: "A large and lovable rabbit deals with three tiny bullies.",
    duration: "10:34",
    size: "720 MB",
    quality: "1080p",
    year: 2008,
    genre: ["Animation", "Comedy", "Family"],
    rating: 8.2,
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "Movies",
    featured: true,
    views: "12.5M",
    likes: "245K"
  },
  {
    id: 2,
    title: "Elephant's Dream",
    description: "An aging machine teaches a young robot about the meaning of life.",
    duration: "10:53",
    size: "640 MB", 
    quality: "1080p",
    year: 2006,
    genre: ["Animation", "Sci-Fi", "Drama"],
    rating: 7.8,
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "Movies",
    featured: true,
    views: "8.2M",
    likes: "189K"
  },
  {
    id: 3,
    title: "For Bigger Blazes",
    description: "A spectacular showcase of fire and smoke effects.",
    duration: "15:10",
    size: "1.2 GB",
    quality: "4K",
    year: 2022,
    genre: ["Documentary", "Action"],
    rating: 8.5,
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    category: "Documentaries",
    featured: false,
    views: "5.7M",
    likes: "156K"
  },
  {
    id: 4,
    title: "For Bigger Escape",
    description: "A thrilling adventure through unknown territories.",
    duration: "18:20",
    size: "1.5 GB",
    quality: "4K", 
    year: 2023,
    genre: ["Adventure", "Thriller"],
    rating: 8.9,
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    category: "Movies",
    featured: true,
    views: "15.3M",
    likes: "398K"
  },
  {
    id: 5,
    title: "For Bigger Fun",
    description: "Comedy gold that will keep you laughing throughout.",
    duration: "22:45",
    size: "1.8 GB",
    quality: "4K",
    year: 2023,
    genre: ["Comedy", "Family"],
    rating: 9.1,
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg", 
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    category: "Comedy",
    featured: true,
    views: "22.1M",
    likes: "567K"
  },
  {
    id: 6,
    title: "For Bigger Joyrides",
    description: "High-octane racing action with stunning visuals.",
    duration: "12:30",
    size: "980 MB",
    quality: "1080p",
    year: 2022,
    genre: ["Action", "Sports"],
    rating: 8.7,
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    category: "Action",
    featured: false,
    views: "9.8M",
    likes: "287K"
  },
  {
    id: 7,
    title: "For Bigger Meltdowns",
    description: "An intense drama about human emotions and relationships.",
    duration: "16:45",
    size: "1.3 GB",
    quality: "4K",
    year: 2023,
    genre: ["Drama", "Thriller"],
    rating: 8.4,
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    category: "Drama",
    featured: false,
    views: "6.9M",
    likes: "201K"
  },
  {
    id: 8,
    title: "Sintel",
    description: "A lonely young woman seeks revenge against a dragon.",
    duration: "14:48",
    size: "1.1 GB",
    quality: "1080p",
    year: 2010,
    genre: ["Animation", "Fantasy", "Adventure"],
    rating: 9.3,
    thumbnail: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    category: "Animation",
    featured: true,
    views: "18.7M",
    likes: "456K"
  }
]

// Enhanced folder structure with categories
const categories = [
  { name: "Featured", icon: Star, count: 5, color: "#ff6b35" },
  { name: "Movies", icon: PlayCircle, count: 25, color: "#4dabf7" },
  { name: "Animation", icon: FileVideo, count: 12, color: "#69db7c" },
  { name: "Comedy", icon: PlayCircle, count: 18, color: "#ffd43b" },
  { name: "Action", icon: PlayCircle, count: 22, color: "#ff6b6b" },
  { name: "Drama", icon: PlayCircle, count: 15, color: "#da77f2" },
  { name: "Documentaries", icon: FolderOpen, count: 8, color: "#74c0fc" },
]

function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'videos', label: 'All Videos', icon: PlayCircle },
    { id: 'categories', label: 'Categories', icon: Grid3X3 },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'watchlist', label: 'Watchlist', icon: Plus },
  ]

  return (
    <div className="sidebar">
      <div className="logo">
        <PlayCircle size={28} />
        <span>StreamFlix</span>
      </div>
      
      {/* User Profile Section */}
      <div className="user-profile">
        <div className="avatar">
          <User size={24} />
        </div>
        <div className="user-info">
          <div className="username">John Doe</div>
          <div className="user-status">Premium Member</div>
        </div>
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

      {/* Categories Section */}
      <div className="categories-section">
        <div className="section-header">
          <FolderOpen size={20} />
          Browse Categories
        </div>
        {categories.map(category => (
          <div 
            key={category.name} 
            className="folder-item"
            onClick={() => setActiveTab('categories')}
          >
            <div className="folder-icon" style={{ backgroundColor: category.color }}>
              <category.icon size={18} />
            </div>
            <span style={{ flex: 1 }}>{category.name}</span>
            <span style={{ color: '#7d8590', fontSize: '14px' }}>
              {category.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Header({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode, 
  showFilters, 
  setShowFilters,
  selectedCategory,
  setSelectedCategory 
}) {
  return (
    <div className="header">
      <div className="search-section">
        <div className="search-container">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search videos, genres, actors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>
        
        <button 
          className={`filter-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          Filters
        </button>
      </div>

      <div className="header-controls">
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 size={18} />
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={18} />
          </button>
        </div>

        <button className="action-btn">
          <Shuffle size={18} />
        </button>

        <button className="action-btn">
          <Download size={18} />
        </button>

        <button className="action-btn">
          <Settings size={18} />
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Quality:</label>
            <select>
              <option value="">All Qualities</option>
              <option value="4K">4K Ultra HD</option>
              <option value="1080p">Full HD 1080p</option>
              <option value="720p">HD 720p</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Year:</label>
            <select>
              <option value="">All Years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Rating:</label>
            <select>
              <option value="">All Ratings</option>
              <option value="9+">9+ ⭐</option>
              <option value="8+">8+ ⭐</option>
              <option value="7+">7+ ⭐</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}

function VideoCard({ video, onPlay, viewMode, isPlaying }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  if (viewMode === 'list') {
    return (
      <div className="video-list-item">
        <div className="list-thumbnail">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/160x90/333/fff?text=No+Image'
            }}
          />
          <div className="list-play-overlay">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </div>
        </div>
        
        <div className="list-content">
          <div className="list-header">
            <h3 className="list-title">{video.title}</h3>
            <div className="list-meta">
              <span className="quality-badge">{video.quality}</span>
              <span className="year">{video.year}</span>
              <span className="rating">⭐ {video.rating}</span>
            </div>
          </div>
          
          <p className="list-description">{video.description}</p>
          
          <div className="list-details">
            <span className="duration">{video.duration}</span>
            <span className="views">{video.views} views</span>
            <span className="likes">👍 {video.likes}</span>
            <div className="genre-tags">
              {video.genre.slice(0, 2).map(g => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
            </div>
          </div>
          
          <div className="list-actions">
            <button 
              className="play-btn"
              onClick={() => onPlay(video)}
            >
              <Play size={16} />
              Play Now
            </button>
            
            <button 
              className={`icon-btn ${isInWatchlist ? 'active' : ''}`}
              onClick={() => setIsInWatchlist(!isInWatchlist)}
            >
              <Plus size={16} />
            </button>
            
            <button 
              className={`icon-btn ${isLiked ? 'active' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart size={16} />
            </button>
            
            <button className="icon-btn">
              <Share2 size={16} />
            </button>
            
            <button className="icon-btn">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`video-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="video-thumbnail">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/320x180/333/fff?text=No+Image'
          }}
        />
        
        <div className="video-overlay">
          <button 
            className="play-overlay"
            onClick={() => onPlay(video)}
          >
            {isPlaying ? <Pause size={40} /> : <Play size={40} />}
          </button>
          
          <div className="video-badges">
            <span className="quality-badge">{video.quality}</span>
            {video.featured && <span className="featured-badge">Featured</span>}
          </div>
          
          <div className="video-actions">
            <button 
              className={`action-icon ${isInWatchlist ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setIsInWatchlist(!isInWatchlist)
              }}
            >
              <Plus size={20} />
            </button>
            
            <button 
              className={`action-icon ${isLiked ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
            >
              <Heart size={20} />
            </button>
            
            <button className="action-icon">
              <Share2 size={20} />
            </button>
          </div>
        </div>
        
        <div className="duration-badge">{video.duration}</div>
      </div>
      
      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>
        <p className="video-description">{video.description}</p>
        
        <div className="video-meta">
          <div className="meta-row">
            <span className="year">{video.year}</span>
            <span className="rating">⭐ {video.rating}</span>
            <span className="views">{video.views}</span>
          </div>
          
          <div className="genre-tags">
            {video.genre.slice(0, 3).map(genre => (
              <span key={genre} className="genre-tag">{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function VideoPlayer({ currentVideo, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useState(null)[0]

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause()
      } else {
        videoRef.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef) {
      setCurrentTime(videoRef.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef) {
      setDuration(videoRef.duration)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e) => {
    if (videoRef) {
      const seekTime = (e.target.value / 100) * duration
      videoRef.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100
    setVolume(newVolume)
    if (videoRef) {
      videoRef.volume = newVolume
    }
  }

  const skipBackward = () => {
    if (videoRef) {
      videoRef.currentTime = Math.max(0, videoRef.currentTime - 10)
    }
  }

  const skipForward = () => {
    if (videoRef) {
      videoRef.currentTime = Math.min(duration, videoRef.currentTime + 10)
    }
  }

  return (
    <div className="video-player-overlay">
      <div className="video-player-container">
        <div className="video-player-header">
          <div className="video-player-info">
            <h2>{currentVideo.title}</h2>
            <div className="video-player-meta">
              <span>{currentVideo.year}</span>
              <span>⭐ {currentVideo.rating}</span>
              <span>{currentVideo.quality}</span>
              <div className="genre-tags">
                {currentVideo.genre.map(genre => (
                  <span key={genre} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div 
          className="video-container"
          onMouseMove={() => setShowControls(true)}
        >
          <video
            ref={(ref) => videoRef.current = ref}
            src={currentVideo.videoUrl}
            className="video-element"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
          />

          {showControls && (
            <div className="video-controls-overlay">
              <div className="video-controls">
                <div className="progress-container">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={duration ? (currentTime / duration) * 100 : 0}
                    onChange={handleSeek}
                    className="progress-bar"
                  />
                </div>

                <div className="controls-bottom">
                  <div className="controls-left">
                    <button className="control-btn" onClick={togglePlay}>
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    
                    <button className="control-btn" onClick={skipBackward}>
                      <SkipBack size={20} />
                    </button>
                    
                    <button className="control-btn" onClick={skipForward}>
                      <SkipForward size={20} />
                    </button>

                    <div className="volume-control">
                      <button 
                        className="control-btn" 
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        <Volume2 size={20} />
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : volume * 100}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                      />
                    </div>

                    <div className="time-display">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>

                  <div className="controls-right">
                    <button className="control-btn">
                      <Settings size={20} />
                    </button>
                    
                    <button 
                      className="control-btn"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                    >
                      🔲
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="video-description">
          <p>{currentVideo.description}</p>
          <div className="video-stats">
            <span>{currentVideo.views} views</span>
            <span>👍 {currentVideo.likes}</span>
            <span>Duration: {currentVideo.duration}</span>
            <span>Size: {currentVideo.size}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FolderBrowser({ onCategorySelect }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
      {categories.map(category => (
        <div 
          key={category.name} 
          className="video-card" 
          onClick={() => onCategorySelect && onCategorySelect(category.name)}
          style={{ cursor: 'pointer' }}
        >
          <div className="video-thumbnail" style={{ 
            background: `linear-gradient(135deg, ${category.color}, ${category.color}80)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            <category.icon size={48} />
          </div>
          <div className="video-info">
            <h3 className="video-title">{category.name}</h3>
            <p className="video-description">{category.count} videos available</p>
          </div>
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
        <VideoCard key={video.id} video={video} onPlay={onPlay} viewMode={viewMode} />
      ))}
    </div>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [currentVideo, setCurrentVideo] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  // Filter videos based on search term and selected category
  const filteredVideos = sampleVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = !selectedCategory || 
                           video.category === selectedCategory || 
                           (selectedCategory === 'Featured' && video.featured)
    
    return matchesSearch && matchesCategory
  })

  // Get featured videos for home page
  const featuredVideos = sampleVideos.filter(video => video.featured)

  const handlePlayVideo = (video) => {
    setCurrentVideo(video)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div>
            <h2 className="section-title">
              <Star size={24} />
              Featured Content
            </h2>
            {currentVideo && (
              <VideoPlayer 
                currentVideo={currentVideo} 
                onClose={() => setCurrentVideo(null)}
              />
            )}
            <VideoGrid 
              videos={featuredVideos} 
              onPlay={handlePlayVideo}
              viewMode={viewMode}
            />
            
            <h2 className="section-title">
              <PlayCircle size={24} />
              Recently Added
            </h2>
            <VideoGrid 
              videos={sampleVideos.slice(0, 4)} 
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
      case 'categories':
        return (
          <div>
            <h2 className="section-title">
              <Grid3X3 size={24} />
              Browse by Categories
            </h2>
            <FolderBrowser onCategorySelect={setSelectedCategory} />
            {selectedCategory && filteredVideos.length > 0 && (
              <>
                <h3 className="section-title">
                  <FileVideo size={20} />
                  {selectedCategory} Videos
                </h3>
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
      case 'watchlist':
        return (
          <div>
            <h2 className="section-title">
              <Plus size={24} />
              Watchlist
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
                <div className="empty-state-icon">📋</div>
                <h3>Your Watchlist is Empty</h3>
                <p>Add videos to your watchlist to see them here</p>
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
          searchQuery={searchTerm}
          setSearchQuery={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="content-area">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default App
