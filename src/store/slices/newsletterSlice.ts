import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { NewsletterSubscription } from "../../types";
import { subscribeToNewsletter } from "../../services/newsletterApi";

interface NewsletterState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: NewsletterState = {
  loading: false,
  success: false,
  error: null,
};

/** Subscribe to the newsletter */
export const subscribe = createAsyncThunk(
  "newsletter/subscribe",
  async (data: NewsletterSubscription) => {
    const response = await subscribeToNewsletter(data);
    return response;
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    resetNewsletterState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribe.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(subscribe.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(subscribe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Erreur lors de l'inscription";
      });
  },
});

export const { resetNewsletterState } = newsletterSlice.actions;
export default newsletterSlice.reducer;
