import { create } from "zustand";

import { type Photo } from "../lib/types";

type Page = Record<number, Photo[]>;

type Cache = Record<string, Page>;

type Store = {
  searchedWords: string[];
  cache: Cache;
  addToCache: (key: string, pageNumber: number, data: Photo[]) => void;
  getCache: (key: string, pageNumber: number) => Photo[] | undefined;
  addSearchedWord: (word: string) => void;
  getSearchedWords: () => string[];
};

// const test: Cache = {
//   popular: {
//     1: [
//       {
//         id: "id1",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id2",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id3",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id4",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id5",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id6",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id7",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id8",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id9",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//       {
//         id: "id10",
//         alt_description: "alt_description1",
//         likes: 1,
//         urls: {
//           full: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=85",
//           raw: "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3",
//           regular:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=1080",
//           small:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=400",
//           small_s3:
//             "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1565881606991-789a8dff9dbb",
//           thumb:
//             "https://images.unsplash.com/photo-1565881606991-789a8dff9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzM0MDF8MHwxfHNlYXJjaHwxfHxwb3B1bGFyfGVufDB8fHx8MTcwOTI4NTg3N3ww&ixlib=rb-4.0.3&q=80&w=200",
//         },
//       },
//     ],
//   },
// } as const;

export const useStore = create<Store>((set, get) => ({
  searchedWords: [],
  cache: {},
  addToCache: (key: string, pageNumber: number, data: Photo[]) => {
    set((state) => ({
      ...state,
      cache: {
        ...state.cache,
        [key]: {
          ...state.cache[key],
          [pageNumber]: data,
        },
      },
    }));
  },
  getCache: (key: string, pageNumber: number) => {
    try {
      return get().cache[key][pageNumber];
    } catch {
      return undefined;
    }
  },
  addSearchedWord: (word: string) => {
    set((state) => {
      const newSearchedWords = state.searchedWords.filter(
        (searchedWord) => searchedWord !== word
      );
      newSearchedWords.unshift(word);
      return {
        ...state,
        searchedWords: newSearchedWords,
      };
    });
  },
  getSearchedWords: () => get().searchedWords,
}));

export default useStore;
