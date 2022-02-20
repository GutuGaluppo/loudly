import React from 'react'
import Track from './Track';

function Playlist({ songs, isPlaying, playTrackByIndex, pauseTrackByIndex, currentSongIndex  }) {
	return <ul>
		{songs?.map((song, idx) => {
			return <Track
				key={song.id}
				song={song}
				idx={idx}
				isPlaying={isPlaying}
				playTrackByIndex={playTrackByIndex}
				pauseTrackByIndex={pauseTrackByIndex}
				currentSongIndex={currentSongIndex}
			/>
		})}
	</ul>
}

export default Playlist