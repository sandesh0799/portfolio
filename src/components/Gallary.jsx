import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(images.length / itemsPerPage);

  useEffect(() => {
    fetch(`${BASE_URL}/images`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid image data");
        const filenames = data.map((img) => img.filename);
        setImages(filenames);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load images", err);
        setLoading(false);
      });
  }, []);

  const currentImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRotation = (index) => {
    const rotations = [
      "-rotate-6",
      "rotate-3",
      "-rotate-2",
      "rotate-6",
      "-rotate-1",
      "rotate-2",
      "-rotate-4",
      "rotate-1",
      "-rotate-3",
      "rotate-5",
    ];
    return rotations[index % rotations.length];
  };

  const getMarginTop = (index) => {
    const margins = [0, 10, 20, 5, 15, 25, 8, 18, 12, 22];
    return margins[index % margins.length];
  };

  const closeModal = () => setSelectedImage(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-t-4 border-b-4 border-orange-400 rounded-full mb-4"></div>
          <p className="text-lg text-gray-600">Loading memories...</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-20 px-6"
      id="gallery"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 font-serif">
          Memory Wall
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          A collection of precious moments captured in time, each polaroid
          telling its own unique story
        </p>
        <p className="text-gray-500 mt-4">
          {images.length} {images.length === 1 ? "memory" : "memories"} on the
          wall
        </p>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {currentImages.map((filename, i) => {
          const index = (currentPage - 1) * itemsPerPage + i;
          const imageUrl = `${BASE_URL}/uploads/${filename}`;
          return (
            <div
              key={filename}
              onClick={() => setSelectedImage({ src: imageUrl, index })}
              className={`relative cursor-pointer group transition-transform hover:scale-110 hover:z-20 ${getRotation(
                index
              )}`}
              style={{
                marginTop: `${getMarginTop(index)}px`,
                transformOrigin: "center center",
              }}
            >
              <div className="bg-white p-4 shadow-xl rounded-sm transition duration-300">
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt={`Memory ${index + 1}`}
                    className="w-full h-48 object-cover transition group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300"></div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-700 font-handwriting">
                    Art #{index + 1}
                  </p>
                  <p className="text-xs text-gray-500 font-mono mt-1">
                    2024 • Digital
                  </p>
                </div>
              </div>

              {/* Polaroid tape & pin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-6 bg-yellow-200/80 rounded-sm rotate-12 shadow-sm"></div>
              <div className="absolute -top-1 right-4 w-8 h-4 bg-yellow-300/60 rounded-sm -rotate-45 shadow-sm"></div>
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full shadow-md opacity-60 group-hover:opacity-80 transition"></div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 space-x-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-5 py-2 bg-orange-200 hover:bg-orange-300 rounded disabled:opacity-40 transition"
        >
          Prev
        </button>
        <span className="text-gray-700 font-mono">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-5 py-2 bg-orange-200 hover:bg-orange-300 rounded disabled:opacity-40 transition"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white z-10 group"
          >
            <svg
              className="w-6 h-6 group-hover:scale-110 transition"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative max-w-4xl max-h-[90vh] bg-white p-8 rounded-lg shadow-2xl">
            <img
              src={selectedImage.src}
              alt={`Memory ${selectedImage.index + 1}`}
              className="w-full max-h-[70vh] object-contain rounded"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 font-serif">
                Artwork #{selectedImage.index + 1}
              </h3>
              <p className="text-gray-600 text-lg mt-2">
                A beautiful piece from my digital art collection
              </p>
            </div>
          </div>
          <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
        </div>
      )}

      {/* Custom styles */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap");
        .font-handwriting {
          font-family: "Kalam", cursive;
        }
        .font-serif {
          font-family: "Georgia", serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > div {
          animation: fadeInUp 0.6s ease-out backwards;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #ea580c);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #d97706, #dc2626);
        }
      `}</style>
    </section>
  );
}
