import { useState, useEffect, useRef } from "react";
import { MapPin, Search, Loader2 } from "lucide-react";

interface LocationOption {
  display_name: string;
  lat: string;
  lon: string;
  addresstype?: string;
  type?: string;
  place_id?: string;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  required?: boolean;
}

const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Search for a city, country...",
  className = "",
  label,
  required = false,
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<LocationOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Search locations using Nominatim API
  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=8&addressdetails=1&extratags=1`,
        {
          headers: {
            "User-Agent": "AegisExpressLogistics/1.0",
          },
        }
      );

      if (response.ok) {
        const data: LocationOption[] = await response.json();

        // Filter for cities, towns, and countries
        const filteredData = data.filter((item) => {
          const type = item.type || item.addresstype || "";
          return [
            "city",
            "town",
            "village",
            "municipality",
            "county",
            "state",
            "country",
            "administrative",
          ].some((validType) => type.toLowerCase().includes(validType));
        });

        setSuggestions(filteredData);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debouncing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setShowSuggestions(true);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout for API call
    debounceRef.current = setTimeout(() => {
      searchLocations(newQuery);
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: LocationOption) => {
    const locationString = formatLocationString(suggestion.display_name);
    setQuery(locationString);
    onChange(locationString);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Format location string to show city, country format
  const formatLocationString = (displayName: string) => {
    const parts = displayName.split(", ");
    if (parts.length >= 2) {
      // Try to get city and country (last part is usually country)
      const country = parts[parts.length - 1];
      const city = parts[0];
      return `${city}, ${country}`;
    }
    return displayName;
  };

  // Handle clicks outside component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update query when value prop changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-zinc-900 dark:text-white text-sm font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-zinc-400 animate-spin" />
          ) : (
            <Search className="h-4 w-4 text-zinc-400" />
          )}
        </div>

        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-400 focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 transition-colors ${className}`}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors border-b border-zinc-200 dark:border-zinc-700 last:border-b-0"
            >
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-zinc-500 dark:text-zinc-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-zinc-900 dark:text-white">
                    {formatLocationString(suggestion.display_name)}
                  </div>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {suggestion.display_name}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions &&
        !isLoading &&
        query.length >= 3 &&
        suggestions.length === 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg shadow-lg p-4">
            <div className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
              No locations found for "{query}"
            </div>
          </div>
        )}
    </div>
  );
};

export default LocationAutocomplete;
