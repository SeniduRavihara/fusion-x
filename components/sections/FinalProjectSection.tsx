import Image from "next/image";
import finalProjectImg from "../../assets/final-project-image.png";

const FinalProjectSection = () => {
  return (
    <section id="final-project" className="w-full py-28 bg-transparent">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Final Project
            </h2>
            <p className="text-white/90 mb-6">
              After completing the intensive 3-day AI learning program,
              participants embark on a one-month journey to create their own
              AI-powered projects.
            </p>
            <p className="text-white/80 mb-6">
              This extended phase allows you to apply everything you&apos;ve
              learned and explore your creativity. Whether it&apos;s computer
              vision applications, natural language processing, predictive
              analytics, or any other AI domain that interests you, the final
              project is your opportunity to build something meaningful.
            </p>
            <p className="text-white/70 mb-6">
              You&apos;ll receive ongoing mentorship and support throughout the
              month, with regular check-ins and guidance to help you overcome
              challenges and refine your ideas.
            </p>
            <div className="bg-neutral-900/50 rounded-xl p-6 border border-neutral-800">
              <h3 className="text-xl font-semibold text-white mb-3">
                Project Requirements
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>
                  • Must incorporate AI/ML concepts learned during the program
                </li>
                <li>• Can be individual or team-based</li>
                <li>
                  • Should solve a real-world problem or demonstrate innovation
                </li>
                <li>• Final presentation and demo required</li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800">
              <Image
                src={finalProjectImg}
                alt="Final Project Development"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg font-medium">
                  One Month of Innovation
                </p>
                <p className="text-white/80 text-sm">
                  Build your AI masterpiece
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalProjectSection;
