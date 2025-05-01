import React, { useEffect, useState } from 'react';
import searchSongs from '../api/searchSongs'; // Make sure the path is correct

const WeatherSongs = ({ weatherMain }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await searchSongs(weatherMain);
        setSongs(result);
      } catch (err) {
        console.error('Error fetching songs:', err);
        setError('Could not load songs.');
      }
      setLoading(false);
    };

    if (weatherMain) {
      fetchSongs();
    }
  }, [weatherMain]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>Songs for "{weatherMain}" Weather 🎵</h2>

      {loading && <p>Loading songs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && songs.length === 0 && <p>No songs found.</p>}

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {songs.map((song, idx) => (
          <div
            key={idx}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '1rem',
              width: '200px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <img
              src={song.image}
              alt={song.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h4 style={{ margin: '0.5rem 0 0' }}>{song.name}</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>{song.artist}</p>
            {song.preview ? (
              <audio controls src={song.preview} style={{ width: '100%' }} />
            ) : (
              <p style={{ fontSize: '0.8rem', color: '#999' }}>No preview</p>
            )}
            <a href={song.url} target="_blank" rel="noopener noreferrer">
              Listen on Spotify →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherSongs;
