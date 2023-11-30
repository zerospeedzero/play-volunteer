import { useState } from 'react';
import axios from 'axios';
const Activity = ({ onClose }) => {
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [repeat, setRepeat] = useState('Recurring');
  const [timing, setTiming] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hoursEarnedPerMonth, setHoursEarnedPerMonth] = useState('');
  const [seat, setSeat] = useState('');

  const handleSubmit = async () => {
    // Handle form submission here
    // You can send the form data to your backend or perform any other action
    // For simplicity, we'll just log the form data to the console
    console.log({
      activityName,
      timing,
      startDate,
      startTime,
      endTime,
      hoursEarnedPerMonth,
      repeat,
      seat,
      description,
    });
    try {
      const formData = {
        name: activityName,
        time: timing,
        date: startDate,
        startTime: startTime,
        endTime: endTime,
        hourEarned: hoursEarnedPerMonth,
        repeat: repeat,
        seats: seat,
        description: description,
      };      
      // Make a POST request using Axios
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, formData);
      // Handle the response as needed
      console.log('API Response:', response.data);

      // Close the popup after successful submission
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }


    // Close the popup after submission
    // onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md w-96 space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="activityName">
            Activity Name
          </label>
          <input
            type="text"
            id="activityName"
            className="w-full border rounded-md p-2"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="w-full border rounded-md p-2"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="timing">
            Timing (Number of Hours)
          </label>
          <input
            type="number"
            id="timing"
            className="w-full border rounded-md p-2"
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
          />
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="startDate">
              Date (Start Date)
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full border rounded-md p-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="startTime">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              className="w-full border rounded-md p-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="endTime">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              className="w-full border rounded-md p-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="hoursEarnedPerMonth">
              Hours Earned Per Month
            </label>
            <input
              type="text"
              id="hoursEarnedPerMonth"
              className="w-full border rounded-md p-2"
              value={hoursEarnedPerMonth}
              onChange={(e) => setHoursEarnedPerMonth(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="repeat">
            Repeat
          </label>
          <select
            id="repeat"
            className="w-full border rounded-md p-2"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
          >
            <option value="Recurring">Recurring</option>
            <option value="Monthly">Monthly</option>
            <option value="Annually">Annually</option>
            <option value="One-time">One-time</option>
          </select>
        </div>

        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="seat">
              Seat (Number)
            </label>
            <input
              type="number"
              id="seat"
              className="w-full border rounded-md p-2"
              value={seat}
              onChange={(e) => setSeat(e.target.value)}
            />
          </div>
        </div>


        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 mx-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Create
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default Activity;
