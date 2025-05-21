export const getCoordinates = async (query) => {
  const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
  const data = await res.json();
  if (!data.length) throw new Error("No results found");
  return [
    parseFloat(data[0].lat),
    parseFloat(data[0].lon)
  ];
};