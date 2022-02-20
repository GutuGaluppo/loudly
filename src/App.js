import { useEffect, useState } from 'react';
import './App.css';
import Player from './components/Player';
import Playlist from './components/Playlist';

function App() {

	const [songs, setSongs] = useState([]);
	const [currentSongIndex, setCurrentSongIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		const BASE_URL = process.env.REACT_APP_API_URL
		const url = `${BASE_URL}/song/trending`
		fetch(url)
			.then(response => response.json())
			.then(data => {
				setSongs(data)
				setIsLoading(false)
			})
	}, [])

	const nextTrack = () => {
		let currSong = currentSongIndex;
		currSong++;
		if (currSong >= songs.length) {
			currSong = 0;
		}
		playTrackByIndex(currSong)
	}

	const prevTrack = () => {
		let currSong = currentSongIndex;
		currSong--;
		if (currSong < 0) {
			currSong = songs.length - 1;
		}
		playTrackByIndex(currSong)
	}

	const playTrackByIndex = (index) => {
		setCurrentSongIndex(index);
		setIsPlaying(true);
	}

	const pauseTrackByIndex = (index) => {
		setCurrentSongIndex(index);
		setIsPlaying(false);
	}

	const togglePlay = () => {
		setIsPlaying(!isPlaying);
	}

	if (isLoading) return <div>Loading...</div>

	return (
		<div className="App">
			<header className="App-header">
				AudioPlayer
			</header>

			<Player
				songs={songs}
				currentSongIndex={currentSongIndex}
				isPlaying={isPlaying}
				togglePlay={togglePlay}
				nextTrack={nextTrack}
				prevTrack={prevTrack}
				playTrackByIndex={playTrackByIndex}
			/>

			<Playlist
				songs={songs}
				playTrackByIndex={playTrackByIndex}
				pauseTrackByIndex={pauseTrackByIndex}
				isPlaying={isPlaying}
				currentSongIndex={currentSongIndex}
			/>

		</div>
	);
}

export default App;
