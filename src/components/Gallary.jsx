import { useState, useEffect } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(images.length / itemsPerPage);

  useEffect(() => {
    fetch("/art/images.json")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid image data");
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load images", err);
        setLoading(false);
      });
  }, []);

  const closeModal = () => setSelectedImage(null);

  const getRotation = (index) => {
    const rotations = [
      "-rotate-6", "rotate-3", "-rotate-2", "rotate-6", "-rotate-1",
      "rotate-2", "-rotate-4", "rotate-1", "-rotate-3", "rotate-5",
      "-rotate-1", "rotate-4", "-rotate-5", "rotate-2", "-rotate-3"
    ];
    return rotations[index % rotations.length];
  };

  const getMarginTop = (index) => {
    const margins = [0, 10, 20, 5, 15, 25, 8, 18, 12, 22];
    return margins[index % margins.length];
  };

  // Get images for current page
  const currentImages = images.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-400 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading memories...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-20 px-6" id="gallary">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4 font-serif">
          Memory Wall
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto mb-6"></div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
          A collection of precious moments captured in time, each polaroid telling its own unique story
        </p>
        <p className="text-gray-500 mt-4">
          {images.length} {images.length === 1 ? "memory" : "memories"} on the wall
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {currentImages.map((image, i) => {
            const realIndex = (currentPage - 1) * itemsPerPage + i;
            const rotation = getRotation(realIndex);
            const marginTop = getMarginTop(realIndex);

            return (
              <div
                key={image}
                className={`${rotation} hover:rotate-0 transition-all duration-500 cursor-pointer group hover:scale-110 hover:z-20 relative`}
                style={{
                  transformOrigin: 'center center',
                  marginTop: `${marginTop}px`,
                  animationDelay: `${realIndex * 0.1}s`
                }}
                onClick={() => setSelectedImage({ src: `/art/${image}`, index: realIndex })}
              >
                <div className="bg-white p-4 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-sm transform-gpu">
                  <div className="relative overflow-hidden bg-gray-100">
                    <img
                      src={`/art/${image}`}
                      alt={`Memory ${realIndex + 1}`}
                      className="w-full h-48 sm:h-40 md:h-48 object-cover transition-all duration-500 group-hover:brightness-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300"></div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-gray-700 text-sm font-handwriting leading-relaxed">
                      Art #{realIndex + 1}
                    </p>
                    <p className="text-gray-500 text-xs mt-1 font-mono">2024 • Digital</p>
                  </div>
                </div>

                {/* Decorative tape + pin */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-yellow-200/80 rounded-sm rotate-12 shadow-sm"></div>
                <div className="absolute -top-1 right-4 w-8 h-4 bg-yellow-300/60 rounded-sm -rotate-45 shadow-sm"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full shadow-md opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-6 mt-12">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-5 py-2 rounded bg-orange-200 hover:bg-orange-300 transition disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-gray-700 font-mono">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-5 py-2 rounded bg-orange-200 hover:bg-orange-300 transition disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 z-10 group"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative max-w-4xl max-h-[90vh] bg-white p-8 rounded-lg shadow-2xl">
            <img
              src={selectedImage.src}
              alt={`Memory ${selectedImage.index + 1}`}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-serif">
                Artwork #{selectedImage.index + 1}
              </h3>
              <p className="text-gray-600 text-lg mb-4">
                A beautiful piece from my digital art collection
              </p>
            </div>
          </div>

          <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');

        .font-handwriting {
          font-family: 'Kalam', cursive;
        }

        .font-serif {
          font-family: 'Georgia', serif;
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
