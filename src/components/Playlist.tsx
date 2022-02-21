import { Songs } from 'Types';
import Track from './Track';

type Props = {
	songs: Songs[];
	currentSongIndex: number
	isPlaying: boolean;
	playTrackByIndex: (index: number) => void;
	pauseTrackByIndex: (index: number) => void;
}

function Playlist({
	songs,
	isPlaying,
	playTrackByIndex,
	pauseTrackByIndex,
	currentSongIndex
}: Props) {
	return <ul>
		{songs?.map((song, idx) => {
			return <Track
				data-testid="track"
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