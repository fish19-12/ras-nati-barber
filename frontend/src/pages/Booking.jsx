const Booking = () => {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-display text-center mb-12">
        Book Appointment
      </h1>

      <form className="bg-card p-8 rounded-2xl space-y-6">
        <input
          className="w-full p-3 bg-black border border-gray-700 rounded"
          placeholder="Full Name"
        />
        <input
          className="w-full p-3 bg-black border border-gray-700 rounded"
          placeholder="Phone Number"
        />

        <select className="w-full p-3 bg-black border border-gray-700 rounded">
          <option>Select Service</option>
          <option>Haircut</option>
          <option>Beard Trim</option>
          <option>Hair + Beard</option>
          <option>Dreadlocks</option>
        </select>

        <input
          type="date"
          className="w-full p-3 bg-black border border-gray-700 rounded"
        />
        <input
          type="time"
          className="w-full p-3 bg-black border border-gray-700 rounded"
        />

        <textarea
          className="w-full p-3 bg-black border border-gray-700 rounded"
          placeholder="Notes"
        ></textarea>

        <button className="w-full bg-primary text-black py-3 rounded-lg font-bold">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Booking;
