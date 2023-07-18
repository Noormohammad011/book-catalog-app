import { Dialog, Disclosure, Transition, Listbox } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import FilterBooks from '../components/screen/FilterBooks';
import BookCard from '../components/shared/BookCard';
import CustomDateRangePicker from '../components/shared/DatePicker';
import Pagination from '../components/shared/Pagination';
import { useGetAllBooksQuery } from '../redux/features/books/bookApi';
import { genreOptions } from '../types/globalTypes';
import moment from 'moment';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { IBook } from '../redux/features/api/type';

const filters = [
  {
    id: 'genre',
    name: 'Genre',
    options: genreOptions.map((genre) => ({
      value: genre,
      label: genre,
      checked: false,
    })),
  },
];

export default function Books() {
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>(
    undefined
  );

  // Convert Date objects to formatted strings
  const formattedFromDate = fromDate
    ? moment(fromDate).format('MM/DD/YYYY')
    : undefined;
  const formattedToDate = toDate
    ? moment(toDate).format('MM/DD/YYYY')
    : undefined;

  const { data: books, isLoading } = useGetAllBooksQuery({
    searchTerm,
    fromDate: formattedFromDate,
    toDate: formattedToDate,
    genre: selectedGenre,
  });

  return (
    <div className="bg-[#F3F4F6]">
      <div>
        {/* Mobile filter dialog */}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className=" text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
              Our Books
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className="flex m-5">
              <Listbox value={selectedGenre} onChange={setSelectedGenre}>
                <div className="relative mt-1 w-[250px]">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedGenre ?? 'Select Genre'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filters.map((section) => (
                        <Fragment key={section.id}>
                          <Listbox.Option
                            key={section.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'text-gray-900'
                              }`
                            }
                            value={selectedGenre}
                          >
                            {({ active, selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {section.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                          {section.options.map((option, optionIdx) => (
                            <Listbox.Option
                              key={option.value}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-amber-100 text-amber-900'
                                    : 'text-gray-900'
                                }`
                              }
                              value={option.value}
                            >
                              {({ active, selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? 'font-medium' : 'font-normal'
                                    }`}
                                  >
                                    {option.label}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Fragment>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                {/* search by genre and author */}
                <FilterBooks
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white lg:bg-transparent py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                {/* =============================================================================== */}
                {/* =============================================================================== */}
                <div className="mt-5">
                  <h4 className="font-medium">Publication Date: </h4>
                  <CustomDateRangePicker
                    fromDate={fromDate}
                    setFromDate={setFromDate}
                    toDate={toDate}
                    setToDate={setToDate}
                  />
                </div>
              </form>
              {/* =============================================================================== */}
              {/* =============================================================================== */}
              {/* Product grid */}
              <div className="lg:col-span-3">
                {books?.data.length ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-8">
                    {books.data.map(
                      ({
                        _id,
                        title,
                        genre,
                        publicationDate,
                        author,
                      }: IBook) => (
                        <BookCard
                          key={_id}
                          image="https://i.ibb.co/r2zns1m/image-01.jpg"
                          BookTitle={title}
                          BookGenre={genre}
                          publicationDate={publicationDate}
                          titleHref={`/book/${_id}`}
                          BookAuthor={author}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <p>No data is present.</p>
                )}
                <div>
                  <Pagination />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
