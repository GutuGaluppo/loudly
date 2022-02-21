import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import Player from './components/Player';
import Playlist from './components/Playlist';
import { Songs } from './Types'

function App() {

	const [songs, setSongs] = useState<Songs[]>([]);
	const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

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

	const playTrackByIndex = (index: number) => {
		setCurrentSongIndex(index);
		setIsPlaying(true);
	}

	const pauseTrackByIndex = (index: number) => {
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
				Loudly - AudioPlayer
			</header>
		

			<div className="player-container">
				<Player
					song={songs[currentSongIndex]}
					currentSongIndex={currentSongIndex}
					isPlaying={isPlaying}
					togglePlay={togglePlay}
					nextTrack={nextTrack}
					prevTrack={prevTrack}
				/>

				<Playlist
					songs={songs}
					playTrackByIndex={playTrackByIndex}
					pauseTrackByIndex={pauseTrackByIndex}
					isPlaying={isPlaying}
					currentSongIndex={currentSongIndex}
				/>
			</div>

		</div>
	);
}

export default App;
