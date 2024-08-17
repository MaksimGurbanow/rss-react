import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name',
    );
    const data = await response.json();
    console.log(
      data.map((country: { name: { common: string; official: string } }) => ({
        label: country.name.official,
        value: country.name.official,
      })),
    );
    return data.map(
      (country: { name: { common: string; official: string } }) => ({
        label: country.name.official,
        value: country.name.official,
      }),
    );
  },
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState: { countries: [], loading: false, error: null } as {
    error: string | null;
    loading: boolean;
    countries: { label: string; value: string }[];
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      });
  },
});

export const selectCountries = (state: RootState) => state.countries.countries;
