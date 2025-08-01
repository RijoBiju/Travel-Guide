import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="p-6">
      <div className="relative rounded-md p-[2px] bg-transparent shadow-lg focus-within:bg-gradient-to-r focus-within:from-blue-500 focus-within:via-purple-500 focus-within:to-pink-500">
        <input
          placeholder="Search destinations..."
          className="pl-4 pr-16 rounded h-10 w-full border-none bg-white focus:outline-none"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default SearchBar;
