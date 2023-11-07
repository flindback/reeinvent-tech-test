import { createContext, useReducer, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const SynonymsContext = createContext();

//Custom hook to use the SynonymsContext
export const useSynonyms = () => useContext(SynonymsContext);

// Context provider
export const SynonymsProvider = ({ children }) => {
  const searchReducer = (state, action) => {
    switch (action.type) {
      case "SET_SEARCH_TERM":
        return { ...state, searchTerm: action.payload };
      case "SET_RESULTS":
        return { ...state, results: action.payload, isLoading: false };
      case "START_LOADING":
        return { ...state, isLoading: true, error: null };
      case "SET_ERROR":
        return { ...state, error: action.payload, isLoading: false };
      default:
        return state;
    }
  };

  // Initial state for searchReducer
  const [searchState, searchDispatch] = useReducer(searchReducer, {
    searchTerm: "",
    results: { message: "", synonyms: [], success: false },
    isLoading: false,
    error: null,
  });

  const searchForSynonyms = async (word) => {
    console.log(word);
    searchDispatch({ type: "START_LOADING" });
    try {
      console.log("Fetching synonyms...");
      const apiURL = "https://reeinvent-tech-test-st7ohfgpsq-lz.a.run.app";
      const { data } = await axios.post(
        `${apiURL}/find`,
        { word: word },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.responseCode === 200) {
        searchDispatch({ type: "SET_RESULTS", payload: data });
        console.log("Synonyms fetched!", data);
      } else {
        throw new Error(data.message || "Error fetching synonyms");
      }
    } catch (e) {
      searchDispatch({ type: "SET_ERROR", payload: e.message });
    } finally {
      searchDispatch({ type: "STOP_LOADING" });
    }
  };

  const [wordsToAdd, setWordsToAdd] = useState([]);

  const addSynonyms = async () => {
    const baseUrl = "https://reeinvent-tech-test-st7ohfgpsq-lz.a.run.app";
    try {
      const data = await axios.post(
        `${baseUrl}/add`,
        { words: wordsToAdd },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.responseCode === 200) {
        setWordsToAdd([]);
        console.log("Synonyms added!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SynonymsContext.Provider
      value={{
        searchState,
        searchForSynonyms,
        searchDispatch,
        wordsToAdd,
        setWordsToAdd,
        addSynonyms,
      }}
    >
      {children}
    </SynonymsContext.Provider>
  );
};

SynonymsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
