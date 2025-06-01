import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";
import { Base_Url } from "../utils/constant";



const Profile = () => {
  const user = useSelector((store) => store.user);
  const [showToast, setShowToast] = useState(false);


  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    photoUrl: "",
    about: "",
    skills: "",
    gender: "",
    age: "",
  });

  // Populate formData once user is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        LastName: user.LastName || "",
        photoUrl: user.photoUrl || "",
        about: user.about || "",
        skills: user.skills?.join(", ") || "",
        gender: user.gender || "",
        age: user.age || "",
      });
    }
  }, [user]);

  if (!user) return <h1 className="text-center mt-10 text-xl text-red-500">Something went wrong: user not found</h1>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges= async ()=>{
    console.log(formData)
      const res = await axios.patch(Base_Url+"/profile/edit",formData,{
        withCredentials : true
      })
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
  }

  return (
    <div className="flex mt-5 justify-center gap-6 flex-wrap">
      <div className="w-full max-w-md p-5 rounded-lg bg-gray-900 text-white shadow-md">
        <div className="flex flex-col items-center mb-6">
          <figure className="h-24 w-24 rounded-full overflow-hidden border-4 border-blue-500 shadow">
            <img
              src={formData.photoUrl || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </figure>
          <h2 className="text-xl font-bold mt-3">{formData.firstName || "Your Name"}</h2>
        </div>

        <form className="space-y-4">
          {/* First & Last Name */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="LastName"
                value={formData.LastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium mb-1">About</label>
            <textarea
              name="about"
              rows="2"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell something about yourself"
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., React, Node.js"
              className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender and Age */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                className="w-full px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => handleSaveChanges()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div>
        <h1 className="m-5 text-xl">Your card will look like this to others</h1>
        <FeedCard user={user} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
