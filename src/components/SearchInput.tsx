import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    debounceMs?: number;
}

export const SearchInput = memo<SearchInputProps>(({
    value,
    onChange,
    placeholder = "Search...",
    className = "",
    debounceMs = 300
}) => {
    const [localValue, setLocalValue] = useState(value);
    const debouncedValue = useDebounce(localValue, debounceMs);
    const inputRef = useRef<HTMLInputElement>(null);

    // Update parent when debounced value changes
    useEffect(() => {
        if (debouncedValue !== value) {
            onChange(debouncedValue);
        }
    }, [debouncedValue, onChange, value]);

    // Sync with external value changes
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setLocalValue('');
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            handleClear();
        }
    }, [handleClear]);

    return (
        <div className={`relative ${className}`}>
            <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                aria-hidden="true"
            />
            <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={localValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Search input"
                autoComplete="off"
                spellCheck="false"
            />
            {localValue && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors duration-150"
                    aria-label="Clear search"
                    type="button"
                >
                    <X className="w-4 h-4" aria-hidden="true" />
                </button>
            )}
        </div>
    );
});

SearchInput.displayName = 'SearchInput';
