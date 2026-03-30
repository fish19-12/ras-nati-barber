import { Link } from "react-router-dom";

const GalleryItem = ({ image }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl group">
      <img
        src={image}
        className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
        <Link
          to="/booking"
          className="bg-primary text-black px-6 py-2 rounded-lg"
        >
          Book This Style
        </Link>
      </div>
    </div>
  );
};

export default GalleryItem;
