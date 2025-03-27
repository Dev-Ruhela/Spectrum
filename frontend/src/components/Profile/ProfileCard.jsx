import React from 'react';
import { useEffect , useState } from 'react';
import { doc , updateDoc } from 'firebase/firestore';
import Footer from '../Footer';
import Header from '../Header';
import { Camera, Pencil , Plus } from 'lucide-react';
import { useAuthStore , db } from '../../../firebase';
import FloatingChatbot from '../FloatingChatbot';
import LottieAnimation from '../../animations/LottieAnimation';

const ProfileCard = () => {
  const { user } = useAuthStore();
  
  // Profile State
  const [profileData, setProfileData] = useState({
    uid: user?.uid || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    image: user?.image || "",
    orientation: user?.orientation || "",
    address: user?.address || "",
    gender: user?.gender || "",
    coins: user?.coins || "",
    ngos: user?.ngos || [],
    interest: user?.interest || [],
    workshops: user?.workshops || [],
    campaign: user?.campaign || [],
    orders: user?.orders || [],
    age: user?.age || "",
    pronouns: user?.pronouns || "",
    skills: user?.skills || []
  });
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Calculate profile completion percentage
  useEffect(() => {
    const totalFields = Object.keys(profileData).length;
    const completedFields = Object.values(profileData).filter(
      (field) => field && field.length > 0
    ).length;

    const percentage = Math.round((completedFields / totalFields) * 100);
    setCompletionPercentage(percentage);
  }, [profileData]);

  const [editFields, setEditFields] = useState({});
  const [newSkill, setNewSkill] = useState("");

  // Handle field edit
  const handleEditClick = (field) => {
    setEditFields((prev) => ({ ...prev, [field]: true }));
  };

  // Handle field save
  const handleSaveClick = async (field) => {
    const docRef = doc(db, "users", user.uid);
    try {
      await updateDoc(docRef, { [field]: profileData[field] });
      setEditFields((prev) => ({ ...prev, [field]: false }));
      console.log(`${field} updated successfully`);
    } catch (error) {
      console.error("Error updating field:", error);
    }
  };

  // Handle field change
  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  // Add New Skill
  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;
    const updatedSkills = [...profileData.skills, newSkill.trim()];

    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, { skills: updatedSkills });

      setProfileData((prev) => ({ ...prev, skills: updatedSkills }));
      setNewSkill(""); // Clear input
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };
  useEffect(() => {
    console.log(user)
  } , [user])
  return (
    <>
    <Header />
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-start gap-6 bg-gradient-to-b from-gray-800 to-black ">
        <div className='absolute left-[600px] right-11 mt-9 text-3xl text-white'>
        " 𝒴𝑜𝓊 𝒹𝑒𝓈𝑒𝓇𝓋𝑒 𝓁𝑜𝓋𝑒 𝒶𝓃𝒹 𝓎𝑜𝓊’𝓁𝓁 𝑔𝑒𝓉 𝒾𝓉 "
        </div>
        <div className="flex flex-row items-start p-4 h-28">
          <img
            src={ profileData.image|| "/defaultLogo.png"}
            alt="Profile"
            className="absolute top-28 w-28 h-28 rounded-full object-cover border border-gray-100"
          />
          <div className='absolute mt-28 ml-20 p-2 rounded-full w-fit bg-gray-200 hover:bg-gray-300'>
            <Camera className='h-5 w-5'/>
          </div>
          <div className='absolute mt-28 ml-36'>
          <div className="flex items-center justify-center mt-3 w-fit -ml-2 text-sm font-semibold bg-indigo-100 text-indigo-800 p-1 px-4 rounded-full">
          {editFields.pronouns ? (
              <div className="flex items-center justify-between">
              <input
                type="text"
                className=" w-16 h-6 border rounded p-2 text-sm"
                value={profileData.pronouns}
                onChange={(e) => handleChange('pronouns', e.target.value)}
              />
              <button
                onClick={() => handleSaveClick('pronouns')}
                className="ml-2 bg-indigo-600 h-6 flex items-center text-white px-3 py-2 rounded text-xs font-thin"
              >
                Save
              </button>
              </div>
              ) : (
              <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{profileData.pronouns || "not specified"}</p>
              <button
                onClick={() => handleEditClick('pronouns')}
                className="ml-2 text-indigo-600 text-sm"
              >
                <Pencil className='h-4 w-4' />
              </button>
              </div>
              )}
          </div>
          <p className="mt-2 text-normal font-bold text-gray-900">{profileData.name}</p>
          <div>
              {editFields.address ? (
              <div className="flex items-center justify-between">
              <input
                type="text"
                className="mt-1 w-full border rounded p-2 text-sm"
                value={profileData.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
              <button
                onClick={() => handleSaveClick('address')}
                className="ml-2 bg-indigo-600 h-13 text-white px-3 py-2 rounded text-sm"
              >
                Save
              </button>
              </div>
              ) : (
              <div className="flex items-center justify-between mt-2">
              <p className="text-sm font-medium">{profileData.address || "add your city / country here "}</p>
              <button
                onClick={() => handleEditClick('address')}
                className="ml-2 text-indigo-600 text-sm"
              >
                Edit
              </button>
              </div>
              )}
            </div>
          </div>
          
        </div>
      </div>

      <div className="flex justify-end p-4 items-center">
          <div className="w-1/6 bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="ml-4 text-sm text-gray-700">
            Profile Completion: {completionPercentage}%
          </span>
        </div>

      {/* Main Section */}
      <div className="mt-16 grid grid-cols-3 gap-6 p-6 mb-16 ">
        {/* Left Column (2/3 Width) */}
        <div className="col-span-2 space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white shadow border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-2 gap-6 ">
            <div>
                <p className="text-sm text-gray-500">Gender</p>
              {editFields.gender ? (
              <div className="flex items-center justify-between">
              <input
                type="text"
                className="mt-1 w-full border rounded p-2 text-sm"
                value={profileData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
              />
              <button
                onClick={() => handleSaveClick('gender')}
                className="ml-2 bg-indigo-600 h-13 text-white px-3 py-2 rounded text-sm"
              >
                Save
              </button>
              </div>
              ) : (
              <div className="flex items-center justify-between mt-2">
              <p className="text-sm font-medium">{profileData.gender || "not specified"}</p>
              <button
                onClick={() => handleEditClick('gender')}
                className="ml-2 text-indigo-600 text-sm"
              >
                Edit
              </button>
              </div>
              )}
            </div>
            <div>
                <p className="text-sm text-gray-500">Orientation</p>
              {editFields.orientation ? (
              <div className="flex items-center justify-between">
              <input
                type="text"
                className="mt-1 w-full border rounded p-2 text-sm"
                value={profileData.orientation}
                onChange={(e) => handleChange('orientation', e.target.value)}
              />
              <button
                onClick={() => handleSaveClick('orientation')}
                className="ml-2 bg-indigo-600 h-13 text-white px-3 py-2 rounded text-sm"
              >
                Save
              </button>
              </div>
              ) : (
              <div className="flex items-center justify-between mt-2">
              <p className="text-sm font-medium">{profileData.orientation || "not specified"}</p>
              <button
                onClick={() => handleEditClick('orientation')}
                className="ml-2 text-indigo-600 text-sm"
              >
                Edit
              </button>
              </div>
              )}
            </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-sm font-medium">{profileData.email}</p>
              </div>
            <div>
                <p className="text-sm text-gray-500">Phone</p>
              {editFields.phone ? (
              <div className="flex items-center justify-between">
              <input
                type="text"
                className="mt-1 w-full border rounded p-2 text-sm"
                value={profileData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              <button
                onClick={() => handleSaveClick('phone')}
                className="ml-2 bg-indigo-600 h-13 text-white px-3 py-2 rounded text-sm"
              >
                Save
              </button>
              </div>
              ) : (
              <div className="flex items-center justify-between mt-2">
              <p className="text-sm font-medium">{profileData.phone || "not specified"}</p>
              <button
                onClick={() => handleEditClick('phone')}
                className="ml-2 text-indigo-600 text-sm"
              >
                Edit
              </button>
              </div>
              )}
            </div>
            </div>
          </div>

          {/* Professional Experience Card */}
          <div className="bg-white shadow border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Professional Experience</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold">Senior UX Designer</h3>
                <p className="text-sm text-gray-500">Tech Solutions Inc. | 2020 - Present</p>
              </div>
              <div>
                <h3 className="text-sm font-bold">UX Designer</h3>
                <p className="text-sm text-gray-500">Creative Agency XYZ | 2018 - 2020</p>
              </div>
            </div>
          </div>

          {/* Education Card */}
          <div className="bg-white shadow border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Education</h2>
            <div>
              <h3 className="text-sm font-bold">Master's in Human-Computer Interaction</h3>
              <p className="text-sm text-gray-500">Stanford University | 2016 - 2018</p>
            </div>
          </div>
        </div>

        {/* Right Column (1/3 Width) */}
        <div className="bg-white shadow border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Skills / Courses</h2>
          
          {/* Display Skills */}
          <div className="flex flex-wrap gap-2">
            {profileData.skills.length > 0 ? (
              profileData.skills.map((skill, index) => (
                <span key={index} className="text-sm font-medium bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full">
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No skills added yet.</p>
            )}
          </div>

          {/* Add New Skill */}
          <div className="mt-4 flex items-center">
            <input
              type="text"
              placeholder="Add a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-full"
            />
            <button 
              onClick={handleAddSkill} 
              className="ml-2 bg-indigo-600 bg-opacity-85 text-white p-2 rounded-full flex items-center hover:bg-opacity-95"
            >
              
              
              <Plus size={18} className="font-bold" />
            </button>
          </div>

          {/* Community Engagement Section */}
          <div className="bg-white shadow border border-gray-200 mt-4 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Community Engagement</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span className="text-sm">Open to Volunteering</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                <span className="text-sm">Interested in Mentoring</span>
              </label>
            </div>
          </div>

          {/* Privacy Settings Section */}
          <div className="bg-white shadow border border-gray-200 mt-4 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500">Profile Visibility</p>
                <select className="w-full border rounded p-2 text-sm">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pronouns Visibility</p>
                <select className="w-full border rounded p-2 text-sm">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <LottieAnimation/>
    <Footer />
    
    </>
  );
};

export default ProfileCard;
