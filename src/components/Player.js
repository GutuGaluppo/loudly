import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBackward, faForward } from "@fortawesome/free-solid-svg-icons";

function Player({ songs, currentSongIndex, isPlaying, togglePlay, nextTrack, prevTrack }) {
	const audioElement = useRef()

	useEffect(() => {
		if (isPlaying) {
			audioElement.current.play();
			
			// TIRARA DEPOIS

			audioElement.current.volume = 0.1;
		} else {
			audioElement.current.pause();
		}
	}, [isPlaying, currentSongIndex])

	return (
		<div>
			<h1>{songs[currentSongIndex].name}</h1>
			<p>{songs[currentSongIndex].artist_name}</p>
			<img src={songs[currentSongIndex].cover_image_path} alt="" width="250px" />
			<audio
				src={songs[currentSongIndex].music_file_path}
				ref={audioElement}
				
			></audio>
			<div className="music-player--controls">
				<button className="skip-btn" onClick={prevTrack}>
					<FontAwesomeIcon icon={faBackward} />
				</button>
				<button className="play-btn" onClick={togglePlay}>
					<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
				</button>
				<button className="skip-btn" onClick={nextTrack}>
					<FontAwesomeIcon icon={faForward} />
				</button>
			</div>
		</div>
	)
}

export default Player