import { useState } from 'react';
import axios from 'axios';

const Popup = ({ onClose }) => {
  const [activityName, setActivityName] = useState('');
  const [description, setDescription] = useState('');
  const [timeframe, setTimeframe] = useState('one-time');
  const [frequency, setFrequency] = useState(''); // Only applicable if timeframe is recursive
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [seat, setSeat] = useState('');
  const [estimatedHoursEarned, setEstimatedHoursEarned] = useState('');
  const [sessions, setSessions] = useState([]);

  const generateSessions = () => {
    // Generate sessions based on the provided logic
    if (timeframe === 'recursive' && frequency && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysOfWeek = [];

      // Generate an array of days of the week based on the selected frequency
      while (start <= end) {
        if (frequency === 'weekly' && start.getDay() === 1) {
          // Only add sessions for Mondays in the case of weekly frequency
          daysOfWeek.push(new Date(start));
        } else if (frequency === 'monthly') {
          // Add sessions for all days in the case of monthly frequency
          daysOfWeek.push(new Date(start));
        }
        start.setDate(start.getDate() + 1);
      }

      // Generate session objects based on the days of the week
      const generatedSessions = daysOfWeek.map((day) => {
        const sessionStartDate = day.toLocaleDateString('en-US');
        const sessionEndDate = end.toLocaleDateString('en-US');
        const sessionStartTime = startTime;
        const sessionEndTime = endTime;
        const sessionSeat = seat;
        const sessionHoursEarned = estimatedHoursEarned;

        return {
          sessionStartDate,
          sessionEndDate,
          sessionStartTime,
          sessionEndTime,
          sessionSeat,
          sessionHoursEarned,
        };
      });

      setSessions(generatedSessions);
    }
  };

  const handleSubmit = async () => {
    try {
      // Generate sessions before submitting the form
      generateSessions();

      // Prepare the data object with the form fields
      const formData = {
        activityName,
        description,
        timeframe,
        frequency,
        startDate,
        endDate,
        startTime,
        endTime,
        seat,
        estimatedHoursEarned,
        sessions,
      };

      // Make a POST request using Axios
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/activities`, formData);

      // Handle the response as needed
      console.log('API Response:', response.data);

      // Close the popup after successful submission
      onClose();
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error('Error submitting form:', error);

      // You may want to display an error message to the user
    }
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
          <label className="block text-sm font-medium text-gray-700" htmlFor="timeframe">
            Timeframe
          </label>
          <select
            id="timeframe"
            className="w-full border rounded-md p-2"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="one-time">One-time</option>
            <option value="recursive">Recursive</option>
          </select>
        </div>

        {timeframe === 'recursive' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="frequency">
              Frequency
            </label>
            <select
              id="frequency"
              className="w-full border rounded-md p-2"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full border rounded-md p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="endDate">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full border rounded-md p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="flex space-x-4 mb-4">
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
        </div>

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="estimatedHoursEarned">
            Estimated Hours Earned
          </label>
          <input
            type="number"
            id="estimatedHoursEarned"
            className="w-full border rounded-md p-2"
            value={estimatedHoursEarned}
            onChange={(e) => setEstimatedHoursEarned(e.target.value)}
          />
        </div>

        {/* Sessions */}
        {sessions.length > 0 && (
          <div>
            <h2 className="text-lg font-medium text-gray-800 mb-2">Sessions</h2>
            <ul>
              {sessions.map((session, index) => (
                <li key={index} className="mb-2">
                  <strong>Session {index + 1}:</strong>
                  <ul>
                    <li>Start Date: {session.sessionStartDate}</li>
                    <li>End Date: {session.sessionEndDate}</li>
                    <li>Start Time: {session.sessionStartTime}</li>
                    <li>End Time: {session.sessionEndTime}</li>
                    <li>Seat: {session.sessionSeat}</li>
                    <li>Hours Earned: {session.sessionHoursEarned}</li>
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
