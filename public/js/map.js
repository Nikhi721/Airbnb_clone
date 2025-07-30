

maptilersdk.config.apiKey = mapToken;
const map = new maptilersdk.Map({
  
    container: "map",
    style:maptilersdk.MapStyle.BASIC,
    center: listing.geometry.coordinates,
    zoom: 9,
  });

  const marker = new maptilersdk.Marker({color:'red'})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new maptilersdk.Popup().setHTML(`<h4>${listing.location}</h4><p>Exact Location provided after booking </p>`))
  .addTo(map);

