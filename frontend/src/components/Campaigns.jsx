import React, { useEffect, useState ,useRef} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Calendar, Search, SearchCheckIcon, SearchIcon } from "lucide-react";
import FloatingChatbot from "./FloatingChatbot";
import { useAuthStore } from "../../firebase";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button"; // Assuming Button is already imported
import LottieAnimation from "../animations/LottieAnimation";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import LottieAnimation8 from "../animations/LottieAnimation8";
const center = { lat: 28.6139, lng: 77.209 };

const Campaign = () => {
  const { campaigns, fetchCampaigns } = useAuthStore();
  const [expandedCampaign, setExpandedCampaign] = useState(null); // Track which campaign is expanded
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category
  const [filteredCampaigns, setFilteredCampaigns] = useState(campaigns); // Filtered campaigns based on search/query
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [selected, setSelected] = useState(null);
  const markersRef = useRef([]);
  const [geoCache, setGeoCache] = useState({}); 

  useEffect(() => {
    fetchCampaigns(); 
  }, [fetchCampaigns]);

  useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

  const toggleDescription = (campaignId) => {
    setExpandedCampaign(expandedCampaign === campaignId ? null : campaignId);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    let filtered = campaigns;

    if (searchQuery) {
      filtered = filtered.filter((campaign) =>
        campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.detail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((campaign) => campaign.type === selectedCategory);
    }

    setFilteredCampaigns(filtered);
  }, [searchQuery, selectedCategory, campaigns]);

  const loadGoogleMapsScript = (callback) => {
    if (window.google && window.google.maps) {
      callback();
      return;
    }

    const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener("load", callback);
    }
  };

  useEffect(() => {
    if (!campaigns.length) return;

    const loadGoogleMapsScript = (callback) => {
      if (window.google && window.google.maps) {
        callback();
        return;
      }

      const existingScript = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = callback;
        document.body.appendChild(script);
      } else {
        existingScript.addEventListener("load", callback);
      }
    };

    loadGoogleMapsScript(() => {
      if (!window.google || !window.google.maps) {
        return;
      }

      if (!mapRef.current) {
        return;
      }

      if (!mapInstance.current) {
        mapInstance.current = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 10,
        });
      }

      const map = mapInstance.current;
      const geocoder = new window.google.maps.Geocoder();
      const bounds = new window.google.maps.LatLngBounds();

      // Clear previous markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      campaigns.forEach((campaign) => {
        const venueAddress = campaign.venue;

        if (geoCache[venueAddress]) {
          addMarker(geoCache[venueAddress], campaign, map, bounds);
        } else {
          geocoder.geocode({ address: venueAddress }, (results, status) => {
            if (status === "OK" && results[0]) {
              const location = results[0].geometry.location;
              const latLng = { lat: location.lat(), lng: location.lng() };

              setGeoCache((prev) => ({ ...prev, [venueAddress]: latLng }));
              addMarker(latLng, campaign, map, bounds);
            } else {
            }
          });
        }
      });

      // Fit map to bounds after markers are placed
      setTimeout(() => {
        if (!bounds.isEmpty()) {
          map.fitBounds(bounds);
        }
      }, 1000);
    });
  }, [campaigns, geoCache]);

  const addMarker = (latLng, campaign, map, bounds) => {

    const marker = new window.google.maps.Marker({
      position: latLng,
      map,
      title: campaign.name,
    });

    bounds.extend(latLng); // Extend bounds to include marker position

    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div><h2>${campaign.name}</h2><p>${campaign.description}</p><p>Date: ${campaign.date}</p></div>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });

    markersRef.current.push(marker);
  };

  return (
    <>
      <Header />
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('campaign.png')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Amazing Campaigns</h1>
            <p className="text-lg md:text-xl mb-8">
              Find and join the most exciting events happening around you
            </p>
            <div className="relative flex w-3/4 md:w-1/2">
              <input
                type="text"
                placeholder="Search events..."
                className="w-full py-3 px-4 rounded-l-xl border-gray-300 focus:outline-none text-black"
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="px-6 py-3 bg-gradient-to-br from-pink-600 to-red-500 text-gray-100 rounded-r-xl hover:bg-gradient-to-tl hover:text-white duration-300">
                <Search />
              </button>
            </div>
          </div>
        </section>

        {/* Filters Section  */}
          <section className="bg-gray-100 py-6">
            <div className="container mx-auto flex justify-center gap-4">
              {["All", "Arts", "Sports", "Tech", "Food"].map((category) => (
                <button
            key={category}
            className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-blue-100"
            onClick={() => handleCategoryFilter(category === "All" ? "" : category)}
                >
            {category}
                </button>
              ))}
            </div>
          </section>

          {/* Featured Events Section */}
        <section className="py-12"
        
        >
  <div className="container mx-auto">
    <h2 className="text-3xl font-normal mb-6 flex items-center gap-2 hover:text-blue-700 duartion-500">Featured Events <Calendar /></h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    data-aos="fade-up"
        data-aos-delay=""
    >
      {filteredCampaigns.length === 0 ? (
        <>
        <div className="w-full text-center justify-center ">
          <img
            src="nocampaign.png"
            alt="No campaigns found"
            className="mx-auto w-full h-auto max-w-xs"
          />
          <p className="text-lg text-gray-400 mt-4">No campaigns found for your search.</p>
        </div>
        <div className="flex justify-center items-center">
          <button
          onClick={() => window.location.reload()}
          >
          <p className="text-2xl flex items-center gap-2 hover:text-blue-700 duration-500">Continue searching for  more campaigns <SearchIcon/> </p>

          </button>
            
        </div>

        </>
        
      ) : (
        filteredCampaigns.map((campaign) => (
          <motion.div
            onClick={() => toggleDescription(campaign.id)}
            key={campaign.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Campaign Image */}
            {campaign.image && (
              <img
                src={campaign.image}
                alt={campaign.name}
                className="w-full h-44 object-cover bg-contain mb-4"
              />
            )}
            <div className="px-3 py-1 bg-blue-300 bg-opacity-50 text-blue-700 rounded-full text-sm mb-2 w-fit ml-4">{campaign.type || "open to all"}</div>
            {/* Campaign Name */}
            <h2 className="text-xl font-medium text-black px-4 mb-4 ">{campaign.name}</h2>

            {/* Description */}
            <p className="text-gray-600 text-md px-4 mb-4">
              {campaign.detail.substring(0, 100)}...
            </p>

            {/* Toggle Read More */}
            <button
              onClick={() => toggleDescription(campaign.id)}
              className="text-blue-500 px-4 font-medium hover:underline transition"
            >
              {expandedCampaign === campaign.id ? "Read less" : "Read more..."}
            </button>

            {/* Campaign Venue, Date, and Type */}
            <div className="mt-4 px-4 mb-3 text-sm text-gray-500">
              <div>
                <p>📍 Venue: {campaign.venue || "to be decided"}</p>
                <p>📅 Date: {campaign.date}</p>
              </div>
            </div>

            {/* Register Button */}
            {campaign.register && (
              <Button
                as="a"
                href={campaign.register}
                target="_blank"
                className="mt-3 ml-3 mb-3 text-white px-6 py-2 rounded-lg hover:scale-105 transition-transform"
              >
                Register Now
              </Button>
            )}
          </motion.div>
        ))
      )}
    </div>
  </div>
</section>


        {/* Modal for Expanded Description */}
        {expandedCampaign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-md max-w-2xl w-full">
              <div className="relative w-full h-60">
                <img
                  src={campaigns.find((campaign) => campaign.id === expandedCampaign).image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-4 mt-3">{campaigns.find((campaign) => campaign.id === expandedCampaign).name}</h2>
              <p>{campaigns.find((campaign) => campaign.id === expandedCampaign).detail}</p>
              <button
                onClick={() => setExpandedCampaign(null)}
                className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Map Section */}
        <section className="py-12 bg-white">
  <div className="container mx-auto flex flex-col items-center justify-center"
  data-aos="fade-left"
  data-aos-delay="delay-100"
  >
    <h2 className="text-4xl font-extralight mb-6 p-2 px-3  text-black hover:text-blue-600 "
    data-aos="fade-down"
  data-aos-delay="delay-100"
    >Find exciting campaigns near you</h2>
    
    {/* Map + Animation Container */}
    <div className="w-full max-w-7xl flex flex-wrap items-center justify-between gap-6">
      
      {/* Map Section */}
      <div 
        className="rounded-lg shadow-lg border flex-grow" 
        ref={mapRef} 
        style={{ height: '400px', width: '48%' }} 
      />

      {/* Lottie Animation */}
      <div className="w-[50%] flex mb-10 justify-center">
        <LottieAnimation8 />
      </div>
      
    </div>
  </div>
</section>

      </div>
      <Footer />
      <LottieAnimation/>
    </>
  );
};

export default Campaign;
