import { Track } from './Track';

describe('Track', () => {
  it('should create an instance - all properties provided', () => {
    const dummyTrack = {
      id: '0rQbvQpjQ6QeeCAnVRzokf',
      uri: 'spotify:track:0rQbvQpjQ6QeeCAnVRzokf',
      name: "Goutte d'eau",
      duration_ms: 157184,
      artists: [
        {
          name: 'Ninho',
          uri: 'spotify:artist:6Te49r3A6f5BiIgBRxH7FH'
        }
      ],
      album: {
        uri: 'spotify:album:14p5CVdJCMRcgvICDAGS7k',
        name: 'Destin',
        images: [
          {
            url:
              'https://i.scdn.co/image/ab67616d00001e023f12b172c90b9fe9232f38d0'
          }
        ]
      }
    };
    expect(new Track(dummyTrack)).toBeTruthy();
  });
  it('should create an instance with default properties', () => {
    console.log(new Track(undefined));
    console.log(new Track({}));
    expect(new Track(undefined)).toBeTruthy();
  });
});
