import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBackward, faForward } from "@fortawesome/free-solid-svg-icons";
import { Songs } from 'Types';

type Props = {
	song: Songs,
	currentSongIndex: number,
	isPlaying: boolean,
	togglePlay: () => void,
	nextTrack: () => void,
	prevTrack: () => void
}

function Player(
	{
		song,
		currentSongIndex,
		isPlaying,
		togglePlay,
		nextTrack,
		prevTrack
	}: Props) {
	const audioElement = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		if (!audioElement.current) return
		if (isPlaying) {
			audioElement.current.play();
		} else {
			audioElement.current.pause();
		}
	}, [isPlaying, currentSongIndex])

	return (
		<div>
			<h1>{song.name}</h1>
			<p>{song.artist_name}</p>
			<br />
			<img src={song.cover_image_path} alt="" width="250px" />

			<audio src={song.music_file_path} ref={audioElement} onEnded={nextTrack} />

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