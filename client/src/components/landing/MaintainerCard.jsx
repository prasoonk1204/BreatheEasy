import { maintainers } from "../../constants/maintainers";

const MaintainerCard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {maintainers.map((maintainer, index) => (
        <a
          key={index}
          href={maintainer.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <div className="bg-linear-to-r from-emerald-500 to-green-600 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-pulse-glow">
            <img
              src={maintainer.avatar}
              alt={maintainer.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
            />

            <h4 className="text-xl font-bold mb-2 notranslate">
              {maintainer.name}
            </h4>

            {(maintainer.commits || maintainer.linesAdded) && (
              <div className="flex justify-center gap-6 text-sm">
                {maintainer.commits && (
                  <span>{maintainer.commits} commits</span>
                )}
                {maintainer.linesAdded && (
                  <span>{maintainer.linesAdded} lines added</span>
                )}
              </div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default MaintainerCard;
