import React, { useState, useEffect } from "react";
import { useAuthStore } from "./store"; // Import Zustand store

const ProfileForm = () => {
  const { user, updateUserSchema, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    age: "",
    phone: "",
    address: "",
    orientation: "",
    gender: "",
    coins: "",
    ngos: [],
    interest: [],
    workshops: [],
    campaign: [],
    orders: [],
    image: "",
  });

  // Populate form with existing user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        ...user,
      }));
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle array fields (e.g., ngos, interest)
  const handleArrayChange = (name, index, value) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [name]: updatedArray,
    }));
  };

  // Add a new item to an array field
  const handleAddArrayItem = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), ""],
    }));
  };

  // Save the profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserSchema(formData);
      alert("Profile updated successfully!");
    } catch (error) {
      
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Orientation */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Orientation</label>
          <input
            type="text"
            name="orientation"
            value={formData.orientation}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* NGOs */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">NGOs</label>
          {formData.ngos.map((ngo, index) => (
            <input
              key={index}
              type="text"
              value={ngo}
              onChange={(e) => handleArrayChange("ngos", index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem("ngos")}
            className="text-blue-500 underline text-sm"
          >
            Add NGO
          </button>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Interests</label>
          {formData.interest.map((interest, index) => (
            <input
              key={index}
              type="text"
              value={interest}
              onChange={(e) => handleArrayChange("interest", index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={() => handleAddArrayItem("interest")}
            className="text-blue-500 underline text-sm"
          >
            Add Interest
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
