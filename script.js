// Lista de canciones
const songs = [
    {
        title: "oh mi Angel",
        artist: "Artista 3",
        src: "oh mi Angel.mp3",
        cover: "https://i.scdn.co/image/ab67616d0000b273ce3f7a5726537f3fd14f2188",
        mood: "triste",
        genre: "rock"
       
    },
    {
        title: "Travis Scott",
        artist: "Artista 2",
        src: "travis.mp3",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpVgByNdbDntccUbO5tWmaVCCGVm_EPlCx8w&s",
        mood: "triste",
        genre: "rock"
       
    },
    {
        title: "November South",
        artist: "Artista 4",
        src: "Our Father’s Sins (Official Lyric Video) - November South.mp3",
        cover: "https://i.scdn.co/image/ab676161000051746c08d788686ad7b2f84d9800",
        genre: "rock"
       
    },
    {
        title: "Noah Kahan",
        artist: "Artista 5",
        src: "Noah Kahan - You’re Gonna Go Far (Official Lyric Video) - NoahKahanVEVO.mp3",
        mood: "triste",
        cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR_kKJbSMfVMVm873vbzqFqokVjkpEG5aHvA&s",
        genre: "rock"
       
    },
    {
        title: "Star Eater",
        artist: "Artista 6",
        src: "Star Eater - Daniel Deluxe.mp3",
        cover: "https://cdn-images.dzcdn.net/images/cover/80acb36159cb75f910d44155a0b5df98/500x500-000000-80-0-0.jpg",
        mood: "triste",
        genre: "rock"
       
    },
    // Agrega más canciones aquí
];

// Elementos del DOM
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.getElementById('song-title');
const artistEl = document.getElementById('artist');
const coverEl = document.getElementById('cover');
const songListEl = document.getElementById('song-list');
const moodBtn = document.getElementById('mood-btn');
const genreBtn = document.getElementById('genre-btn');

let currentSongIndex = 0;

// Cargar canción
function loadSong(song) {
    songTitle.textContent = song.title;
    artistEl.textContent = song.artist;
    coverEl.src = song.cover;
    audioPlayer.src = song.src;
}

// Reproducir canción
function playSong() {
    audioPlayer.play();
    playBtn.textContent = "⏸";
}

// Pausar canción
function pauseSong() {
    audioPlayer.pause();
    playBtn.textContent = "▶";
}

// Siguiente canción
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Canción anterior
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Actualizar barra de progreso
function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.value = progressPercent;
    
    // Formatear tiempo
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
}

// Establecer progreso de la canción
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Recomendar por estado de ánimo
function recommendByMood() {
    const moods = ["feliz", "triste", "energico", "relajado"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    const moodSongs = songs.filter(song => song.mood === randomMood);
    
    if (moodSongs.length > 0) {
        const randomSong = moodSongs[Math.floor(Math.random() * moodSongs.length)];
        currentSongIndex = songs.indexOf(randomSong);
        loadSong(randomSong);
        playSong();
        alert(`Recomendación para estado de ánimo: ${randomMood}`);
    }
}

// Recomendar por género
function recommendByGenre() {
    const genres = ["pop", "rock", "jazz", "clasica"];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
    const genreSongs = songs.filter(song => song.genre === randomGenre);
    
    if (genreSongs.length > 0) {
        const randomSong = genreSongs[Math.floor(Math.random() * genreSongs.length)];
        currentSongIndex = songs.indexOf(randomSong);
        loadSong(randomSong);
        playSong();
        alert(`Recomendación por género: ${randomGenre}`);
    }
}

// Mostrar lista de reproducción
function displayPlaylist() {
    songListEl.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(song);
            playSong();
        });
        songListEl.appendChild(li);
    });
}

// Event listeners
playBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextSong);

moodBtn.addEventListener('click', recommendByMood);
genreBtn.addEventListener('click', recommendByGenre);

// Inicializar
loadSong(songs[currentSongIndex]);
displayPlaylist();
