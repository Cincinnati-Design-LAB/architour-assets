'use client';

import { CloudinaryFolder } from '@/utils/cloudinary';
import Fuse from 'fuse.js';
import { useState } from 'react';

type FolderSearchProps = {
  model: string;
  folders: CloudinaryFolder[];
  imagesToken: string;
};

export const FolderSearch: React.FC<FolderSearchProps> = (props) => {
  const [searchResults, setSearchResults] = useState<CloudinaryFolder[]>([]);

  const fuse = new Fuse(props.folders, { keys: ['name'] });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (!searchTerm || !searchTerm.length) {
      setSearchResults([]);
      return;
    }
    const searchResults = fuse.search(searchTerm);
    setSearchResults(searchResults.map((result) => result.item));
  };

  return (
    <div className="max-w-2xl py-6 mx-auto">
      <input
        type="text"
        className="block w-full px-3 py-2 border rounded-md border-slate-300"
        autoFocus
        placeholder={`Search for ${props.model.slice(0, -1)}`}
        onChange={handleSearch}
      />

      {searchResults.length > 0 && (
        <div className="mt-4">
          {searchResults.slice(0, 20).map((folder, index) => (
            <SearchResult key={index} folder={folder} imagesToken={props.imagesToken} />
          ))}
        </div>
      )}
    </div>
  );
};

const SearchResult: React.FC<{ folder: CloudinaryFolder; imagesToken: string }> = (props) => {
  return (
    <a
      className="block px-2 py-1 rounded-md hover:bg-slate-100 hover:underline"
      href={`/${props.imagesToken}/${props.folder.path}`}
    >
      {props.folder.name}
    </a>
  );
};
