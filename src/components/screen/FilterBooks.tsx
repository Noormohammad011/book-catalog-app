import React from 'react';

interface FilterBooksProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const FilterBooks: React.FC<FilterBooksProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div>
      <div className="search">
        <div className="mb-3">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-400 "
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBooks;
