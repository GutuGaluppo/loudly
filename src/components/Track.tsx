import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faHeart } from "@fortawesome/free-solid-svg-icons";

type Props = {
	song: {
		id: string;
		name: string,
		cover_image_path: string,
		artist_name: string,
	}
	idx: number,
	isPlaying: boolean,
	playTrackByIndex: (idx: number) => void,
	pauseTrackByIndex: (idx: number) => void,
	currentSongIndex: number
}

function Track({
	song,
	idx,
	isPlaying,
	playTrackByIndex,
	pauseTrackByIndex,
	currentSongIndex
}: Props) {
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
			body: new URLSearchParams({ id: song.id.toString() })
		}).then(res => {
			console.log("Request complete! response:", res);
			setLiked(true);
		});
	}

	return <div className={isCurrentSong ? "playing-track" : "list-item"}>
		<div className="list-item-cover-title">
			<img src={song.cover_image_path} alt="song" />
			<div>
				<p><strong>
					{song.name}
				</strong></p>
				<small>
					<em>{song.artist_name}</em>
				</small>
			</div>
		</div>
		<div>
			{(isPlaying && isCurrentSong) ? (
				<button className="list-item-play-btn" onClick={() => pauseTrackByIndex(idx)}>
					<FontAwesomeIcon icon={faPause} />
				</button>
			) : (
				<button className="list-item-play-btn" onClick={() => playTrackByIndex(idx)}>
					<FontAwesomeIcon icon={faPlay} />
				</button>
			)}
			<button onClick={handleLike} className="like-btn">
				<FontAwesomeIcon icon={faHeart} className={liked ? "liked" : ""}/>
			</button>
		</div>
	</div>
}

export default Track