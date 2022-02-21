import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Playlist from './Playlist';


describe('renders Playlist', () => {

	it('renders playlist', () => {
		render(<Playlist songs={[
			{
				id: '01',
				name: "Song 1",
				artist_name: "Artist 1",
				cover_image_path: "https://www.example.com/image.jpg",
				music_file_path: "https://www.example.com/song.mp3",
			},
			{
				id: '02',
				name: "Song 2",
				artist_name: "Artist 2",
				cover_image_path: "https://www.example.com/image.jpg",
				music_file_path: "https://www.example.com/song.mp3",
			}
		]} />);
		const linkElement = screen.getByText(/Song 1/i);
		expect(linkElement).toBeInTheDocument();

		const linkElement2 = screen.getByText(/Song 2/i);
		expect(linkElement2).toBeInTheDocument();

	});

	it('renders correctly when there are no items', () => {
		const tree = renderer.create(<Playlist songs={[]} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
})