import React, {useState} from 'react';
import {TextField, InputAdornment, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleClear = () => {
        setQuery('');
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            }}
            variant="outlined"
            placeholder="Search Product"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleClear}>
                            <ClearIcon/>
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};