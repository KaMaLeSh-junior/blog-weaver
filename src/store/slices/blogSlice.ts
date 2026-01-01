import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BlogPost } from "@/data/blogData";

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  activeCategory: string;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  activeCategory: "all",
  searchQuery: "",
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<BlogPost[]>) => {
      state.posts = action.payload;
    },
    setCurrentPost: (state, action: PayloadAction<BlogPost | null>) => {
      state.currentPost = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPosts,
  setCurrentPost,
  setActiveCategory,
  setSearchQuery,
  setLoading,
  setError,
} = blogSlice.actions;
export default blogSlice.reducer;
