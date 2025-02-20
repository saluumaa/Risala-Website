import { useState } from "react";
import axios from "axios";
import apiRequest from "../../utils/apiRequest";

const SummerYouth = () => {
  const [formData, setFormData] = useState({
    participantName: "",
    telephoneNo: "",
    age: "",
    gender: "",
    educationLevel: "",
    school: "",
    area: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest.post("/syp", formData);
      alert("Registration successful!");
      setFormData({
        participantName: "",
        telephoneNo: "",
        age: "",
        gender: "",
        educationLevel: "",
        school: "",
        area: "",
      });
    } catch (error) {
      console.error("Error registering:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 mt-20 bg-gray-50 rounded shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Summer Youth Programme Registration
      </h2>

      {/* Participant Name */}
      <div>
        <label className="block text-gray-700 font-medium">Participant Name</label>
        <input
          type="text"
          name="participantName"
          value={formData.participantName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Telephone Number */}
      <div>
        <label className="block text-gray-700 font-medium">Telephone Number</label>
        <input
          type="text"
          name="telephoneNo"
          value={formData.telephoneNo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Age */}
      <div>
        <label className="block text-gray-700 font-medium">Age</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          min="1"
          max="100"
          required
        />
      </div>

      {/* Gender */}
      <div>
        <label className="block text-gray-700 font-medium">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Education Level */}
      <div>
        <label className="block text-gray-700 font-medium">Education Level</label>
        <select
          name="educationLevel"
          value={formData.educationLevel}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>
            Select Education Level
          </option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="Tertiary">Tertiary</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* School */}
      <div>
        <label className="block text-gray-700 font-medium">School</label>
        <input
          type="text"
          name="school"
          value={formData.school}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Area */}
      <div>
        <label className="block text-gray-700 font-medium">Area</label>
        <select
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="" disabled>
            Select Area
          </option>
          <option value="Urban">Urban</option>
          <option value="Suburban">Suburban</option>
          <option value="Rural">Rural</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-semibold"
      >
        Register
      </button>
    </form>
  );
};

export default SummerYouth;
