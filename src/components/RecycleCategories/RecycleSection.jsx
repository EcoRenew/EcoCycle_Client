const RecycleSection = ({ heading, description, videoUrl }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-10 items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-green-800 mb-4">{heading}</h2>
          <p className="text-gray-700 dark:text-gray-500 leading-relaxed text-base whitespace-pre-line">
            {description}
          </p>
        </div>
        <div className="flex-1">
          <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={videoUrl}
              title="Recycling Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecycleSection;
