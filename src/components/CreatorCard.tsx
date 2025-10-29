import { Link } from 'react-router-dom';
import type { Creator } from '../api/creators';

interface CreatorCardProps {
  creator: Creator;
}

export const CreatorCard = ({ creator }: CreatorCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg group cursor-pointer">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={creator.thumbnail}
            alt={creator.name}
            className="w-14 h-14 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">{creator.name}</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">{creator.city}</p>
            <span className="inline-block px-3 py-1.5 bg-white/80 dark:bg-white/20 backdrop-blur-md border border-gray-200 dark:border-white/30 rounded-full text-xs font-medium text-slate-900 dark:text-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default">
              {creator.contentNiche}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Followers</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">{creator.instagramFollowers}</p>
          </div>
          <Link
            to={`/creator/${creator.id}`}
            className="px-5 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-lg text-slate-900 dark:text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 justify-center"
          >
            <i className="ph ph-eye"></i>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};
