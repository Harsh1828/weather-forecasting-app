const searchSongs = async (mood) => {
  const response = await fetch(`http://localhost:5000/songs?mood=${mood}`);
  if (!response.ok) throw new Error('Failed to fetch songs');
  const data = await response.json();
  return data;
};

export default searchSongs;
