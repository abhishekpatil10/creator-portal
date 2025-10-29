// no router links used in this table
import type { Creator } from '../api/creators';

interface TableViewProps {
  creators: Creator[];
  onViewClick?: (id: number) => void;
  onEditClick?: (id: number) => void;
}

export const TableView = ({ creators, onViewClick, onEditClick }: TableViewProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/20 dark:bg-white/10 backdrop-blur-md border-b border-white/20">
            <tr>
              <th className="px-6 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold text-sm uppercase tracking-wide">Creator</th>
              <th className="px-6 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold text-sm uppercase tracking-wide">Content Niche</th>
              <th className="px-6 py-4 text-left text-slate-700 dark:text-slate-200 font-semibold text-sm uppercase tracking-wide">Followers</th>
              <th className="px-6 py-4 text-center text-slate-700 dark:text-slate-200 font-semibold text-sm uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {creators.map((creator) => (
              <tr key={creator.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200 hover:shadow-sm">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={creator.thumbnail}
                      alt={creator.name}
                      className="w-12 h-12 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{creator.name}</p>
                      <p className="text-sm text-gray-500 dark:text-slate-400">{creator.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-3 py-1.5 bg-white/80 dark:bg-white/20 backdrop-blur-md border border-gray-200 dark:border-white/30 rounded-full text-xs font-medium text-slate-900 dark:text-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-default">
                    {creator.contentNiche}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-slate-700 dark:text-slate-300 font-semibold">{creator.instagramFollowers}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onViewClick && creator.id && onViewClick(creator.id)}
                      className="px-3 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-lg text-slate-900 dark:text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <i className="ph ph-eye"></i>
                      View
                    </button>
                    <button
                      onClick={() => onEditClick && creator.id && onEditClick(creator.id)}
                      className="px-3 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 shadow-sm hover:shadow-lg text-slate-900 dark:text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                      <i className="ph ph-pencil-simple"></i>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

