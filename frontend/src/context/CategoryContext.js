import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    loading: false,
    category: 'economy',
    error: null
}

export const CategoryContext = createContext(INITIAL_STATE);

const CategoryReducer = (state, action) => {
    switch(action.type) {
        case "CATEGORY_START":
            return {
                loading: true,
                category: 'economy',
                error: null
            }
        case "CATEGORY_SUCCESS":
            return {
                loading: false,
                category: action.payload,
                error: null
            } 
        case "CATEGORY_FAILURE":
            return {
                loading: false,
                category: 'economy',
                error: action.payload
            }

        default:
            return state
    }
}

export const CategoryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(CategoryReducer, INITIAL_STATE);
    return (
        <CategoryContext.Provider value={{ categoryDispatch: dispatch, category: state.category }}>
            { children }
        </CategoryContext.Provider>
    )
}