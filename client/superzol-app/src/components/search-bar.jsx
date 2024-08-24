import React, {useState} from 'react';
import {InputAdornment, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {CategoriesButton, SearchBarContainer, SearchButton, StyledTextField} from "./search-bar.styled";
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
export const SearchBar = ({onSearch, onCategoriesClick}) => {
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
        <SearchBarContainer>
            <SearchButton onClick={handleSearch}>
                <SearchIcon/>
            </SearchButton>
            <StyledTextField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                variant="outlined"
                placeholder="חיפוש פריט, קטגוריה או מותג..."
                InputProps={{
                    endAdornment: query && (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClear}>
                                <ClearIcon/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                fullWidth
            />
            <CategoriesButton onClick={onCategoriesClick}>
                <WidgetsRoundedIcon/>
            </CategoriesButton>
        </SearchBarContainer>
    );
};