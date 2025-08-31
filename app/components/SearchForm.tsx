import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
import ResetBtn from "./SearchFormReset";

const SearchForm = ({query}: {query?: string}) => {
  return (
    <Form action="" scroll={false} className="search-form">
      <input
        type="text"
        className="w-full outline-none"
        defaultValue={query}
        placeholder="Search startups"
        name="query"
      />
      <div className="flex gap-1">
        {query && <ResetBtn />}
        <button type="submit" className="rounded-full bg-black p-2 cursor-pointer">
          <Search className="text-white size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
