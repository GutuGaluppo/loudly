import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faHeart } from "@fortawesome/free-solid-svg-icons";

function Track({ song, idx, isPlaying, playTrackByIndex, pauseTrackByIndex, currentSongIndex }) {


	console.log('song', song);
	const [liked, setLiked] = useState(false);

	const isCurrentSong = currentSongIndex === idx;

	const handleLike = () => {
		if (liked)
		// TODO 
		// Implement "undo like"
			return
		const API_KEY = process.env.REACT_APP_API_KEY
		const BASE_URL = process.env.REACT_APP_API_URL

		fetch(`${BASE_URL}/interact/like?apikey=${API_KEY}`, {
			method: "POST",
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ id: song.id })
		}).then(res => {
			console.log("Request complete! response:", res);
			setLiked(true);
		});
	}

	return <div className="list-item">
		<img src={song.cover_image_path} alt="song" className="cover_list" />
		<div>
			<p><strong>
				{song.name}
			</strong></p>
			<small>
				{song.artist_name}
			</small>
			<button onClick={handleLike} className="like-btn">
				<FontAwesomeIcon icon={faHeart} className="icon-heart" />
			</button>
		</div>
		{(isPlaying && isCurrentSong) ? (
			<button className="list-item-play-btn" onClick={() => pauseTrackByIndex(idx)}>
				<FontAwesomeIcon icon={faPause} />
			</button>
		) : (
			<button className="list-item-play-btn" onClick={() => playTrackByIndex(idx)}>
				<FontAwesomeIcon icon={faPlay} />
			</button>
		)
		}
	</div>
}

export default Track