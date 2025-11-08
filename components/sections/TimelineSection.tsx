const TimelineSection = () => {
  const timelineItems = [
    {
      day: "Day 1",
      title: "Python Basics & Fundamentals",
      description:
        "Introduction to Python programming, data structures, and basic concepts essential for AI development.",
    },
    {
      day: "Day 2",
      title: "Neural Networks & Machine Learning",
      description:
        "Hands-on learning about neural networks, basic machine learning algorithms, and practical implementations.",
    },
    {
      day: "Day 3",
      title: "Project Building Workshop",
      description:
        "Collaborative session where participants build two AI projects with guidance from mentors.",
    },
    {
      day: "Final Project Phase",
      title: "One-Month AI Project Development",
      description:
        "Extended period for participants to work on comprehensive AI projects of their choice, with ongoing support.",
    },
  ];

  return (
    <section id="timeline" className="w-full py-28 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-4">Timeline</h2>
        <p className="text-white/90 max-w-3xl mb-12">
          A comprehensive 3-day intensive AI learning experience followed by a
          one-month project development phase.
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-purple-500 to-blue-500"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <div key={index} className="relative flex items-start gap-8">
                {/* Timeline dot */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-linear-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {item.day}: {item.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
