import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Compass, Phone, Search, SearchCheckIcon, SearchIcon } from "lucide-react";
import LottieAnimation from "../animations/LottieAnimation";
import LottieAnimation4 from "../animations/LottieAnimation4";
import LottieAnimation6 from "../animations/LottieAnimation6";
import LottieAnimation5 from "../animations/LottieAnimation5";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import LottieAnimation7 from "../animations/LottieAnimation7";

const Connect = () => {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [found , setFound] = useState(false);
  const [ngos, setNgos] = useState([]);
  const [message, setMessage] = useState(""); 

  const mapRef = useRef(null);
  
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;
  useEffect(() => {
      AOS.init({ duration: 1400 });
    }, []);
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry&map_ids=${GOOGLE_MAPS_MAP_ID}`;
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }
  }, []);

  const initializeMap = () => {
    const map = new window.google.maps.Map(mapRef.current, {
      zoom: 10,
      center: { lat: 28.6139, lng: 77.209 }, 
      mapId: GOOGLE_MAPS_MAP_ID,
    });
  
    new window.google.maps.Marker({
      position: { lat: 28.6139, lng: 77.209 },
      map: map,
      title: "Default Location",
    });
  };

  const handleSearch = () => {
    if (!window.google) return;
    
    setLoading(true);
    const geocoder = new window.google.maps.Geocoder();
  
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK") {
        const searchLocation = results[0].geometry.location;
  
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 14,
          center: searchLocation,
          mapId: GOOGLE_MAPS_MAP_ID,
        });
  
        const service = new window.google.maps.places.PlacesService(map);
        const request = {
          query: `LGBTQ NGOs near ${location}`,
          fields: ["name", "geometry", "formatted_address", "place_id"], // Add place_id to fetch details
        };
  
        service.textSearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const updatedNgos = [];
  
            results.forEach((place) => {
              const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
                searchLocation,
                place.geometry.location
              );
  
              // Fetch contact number using Place Details API
              service.getDetails({ placeId: place.place_id }, (details, detailStatus) => {
                const phoneNumber = 
                  detailStatus === window.google.maps.places.PlacesServiceStatus.OK && details.formatted_phone_number
                    ? details.formatted_phone_number
                    : "Not Available";
  
                updatedNgos.push({
                  ...place,
                  distance: (distance / 1000).toFixed(2), // Distance in km
                  phone: phoneNumber,
                });
  
                if (updatedNgos.length === results.length) {
                  updatedNgos.sort((a, b) => a.distance - b.distance);
                  setNgos(updatedNgos);
                  setMessage(""); // Clear message if NGOs are found
                }
              });
  
              // Add markers for each NGO
              // Inside handleSearch (Adding Markers for NGOs)
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: map,
                title: place.name,
              });

  
              marker.addListener("click", () => {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat()},${place.geometry.location.lng()}`,
                  "_blank"
                );
              });
            });
  
            map.setCenter(results[0].geometry.location);
          } else {
            setNgos([]); // Clear previous results
            setMessage("Not found in your region."); // User-friendly message
          }
          setLoading(false);
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
        setLoading(false);
      }
    });
  };
  

  return (
    <>
      <Header />
      <div className="min-h-screen ">
  <section className="relative text-white bg-[url('ngo1.png')] bg-contain bg-center">
    <div className="absolute inset-0 bg-black bg-opacity-65"></div>
    <div className="container mx-auto p-10 text-center relative z-10">
      <h2 className="text-4xl font-bold mb-6 mt-12 bg-gradient-to-r bg-clip-text text-transparent from-pink-200 via-blue-200 to-purple-200">
        Find NGOs Near You
      </h2>
      <p className="text-lg mb-8 text-pink-100">
        Connect with organizations making a difference in your community.
      </p>

      <div className="flex flex-col p-5 md:flex-row justify-center gap-6 mb-8 rounded-lg">
        <input
          type="text"
          placeholder="Enter your location"
          className="border border-gray-300 rounded-lg p-3 w-full md:w-2/3 text-gray-800"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button
          className="bg-gradient-to-br from-pink-600 to-red-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-gradient-to-l transform hover:scale-105 transition-all duration-300"
          onClick={handleSearch}
        >
          <Search />
        </button>
      </div>
    </div>
  </section>

  <section className="container mx-auto p-10 mb-20">
  {ngos.length === 0 && !message && (
    <h3 className="text-lg flex gap-1 items-center font-light mb-4 w-fit p-2 px-3 text-blue-700 rounded-lg">
      Search Nearby NGOs <SearchIcon className="font-thin h-4 w-4" />
    </h3>
  )}

  {ngos.length > 0 && (
    <h3 className="text-sm font-normal mb-4 bg-blue-500 bg-opacity-30 w-fit p-1 px-3 text-blue-800 rounded-lg">
      Found {ngos.length} NGOs matching your search
    </h3>
  )}

  <div className="grid md:grid-cols-2 min-h-10 gap-6"
    data-aos="fade-up">
    <div ref={mapRef} className="w-full h-96 rounded-lg shadow-md duartion-500"></div>
    {ngos.length == 0 && message && (
      <div className="flex flex-col items-center justify-center rounded-lg">
      <LottieAnimation7 />
      <p className="text-center text-red-600 bg-red-500 bg-opacity-30 p-2 rounded-lg text-sm font-normal ">Sorry ! Could not find any NGOs in searched region</p>
    </div>
    )}
    {loading ? (
      <LottieAnimation5 />
    ) : ngos.length === 0 && !loading && !message ? (
      <div className="flex flex-col items-center justify-center rounded-lg">
        <LottieAnimation6 />
        <p className="text-center text-gray-500">Search NGOs near you</p>
      </div>
    ) : (
      <div className="h-96 overflow-y-auto space-y-6 rounded-lg px-6">
        {ngos.map((ngo, index) => (
          <div key={index} className="bg-white border border-gray-100 hover:shadow-lg rounded-lg p-6 shadow-md">
            <h4 className="text-xl font-semibold text-black mb-2">{ngo.name}</h4>
            <p className="text-sm text-gray-500 mb-2">{ngo.formatted_address}</p>
            <div className="flex justify-between items-center mt-4">
            <p className="text-xs font-extralight p-2 bg-blue-500 bg-opacity-30 w-fit rounded-lg text-blue-700">
              <span className="font-semibold">{ngo.distance} </span>km from searched location
            </p>
            <div className="flex gap-2 items-center justify-center">
            <p className="p-1 text-sm px-2 border border-black  w-fit rounded-lg text-black font-light flex gap-1 items-center">
              <Phone className="h-4 w-4" /> {ngo.phone}
            </p>
            <button
              className="text-black flex gap-1 items-center text-sm font-light p-1 px-2 border border-black rounded-lg hover:bg-gray-900 hover:text-white duration-300  "
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${ngo.geometry.location.lat()},${ngo.geometry.location.lng()}`,
                  "_blank"
                )
              }
            >
             Get Directions 
            </button>
            </div>
            </div>
            
          </div>
        ))}
      </div>
    )}
  </div>
</section>

</div>

      <LottieAnimation />
      <Footer />
    </>
  );
};

export default Connect;