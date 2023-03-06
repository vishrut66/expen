import React, { useEffect, useReducer, useContext } from "react";
import reducer from "./reducer";
import { DISPLAY_ALERT, CLEAR_ALERT, SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_EXP_BEGIN, CREATE_EXP_SUCCESS, CREATE_EXP_ERROR, GET_EXP_BEGIN, GET_EXP_SUCCESS, SET_EDIT_EXP, DELETE_EXP_BEGIN, EDIT_EXP_BEGIN, EDIT_EXP_SUCCESS, EDIT_EXP_ERROR, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_FILTERS, CHANGE_PAGE } from "./actions.js"
import axios from "axios";





const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const profession = localStorage.getItem('profession');

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: "",
    alertType: "",

    // show side bar
    showSidebar: false,

    // user
    user: user ? JSON.parse(user) : null,
    profession: profession || "",

    // expense
    typeOptions: ["income", "expense"],
    typeOp: "all",
    catagoryType: "",
    amount: "",
    refrence: "",
    date: '',
    description: "",
    editExpId: "",
    // get all expen
    expense: [],
    totalExpense: 0,
    numOfPages: 1,
    page: 1,

    // initial stats
    stats: {},
    // monthlyApplications: []

    search: '',
    amounts: '',
    type: 'all',


};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    // jwt token set
    const authFetch = axios.create({
        baseURL: "/api/v1"
    });

    // response interceptor
    authFetch.interceptors.request.use(
        (config) => {
            config.headers["Authorization"] = `Bearer ${state.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    // response interceptor
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.response);
            if (error.response.status === 401) {
                console.log("AUTH ERROR");
            }
            return Promise.reject(error);
        }
    );

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
        clearAlert();
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    const addUserToLocalStorage = ({ user, token, profession }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('profession', profession);

    }
    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('token');
        localStorage.removeItem("user");
        localStorage.removeItem('profession');

    }

    const setUpUser = async (currentUser, endPoint) => {
        try {
            dispatch({ type: SETUP_USER_BEGIN })

            const res = await axios.post(`/api/v1/user/${endPoint}`, currentUser)

            const { user, token } = res.data;
            let profession;

            if (user) {
                profession = user.profession
            }

            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: { user, token, profession },
            });

            // there are two type to get token and info in browser 1) coockies 2) local storage 
            addUserToLocalStorage({ user, token, profession, })

        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();

    };

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage()
    }

    const updateUser = async (currentUser) => {

        dispatch({ type: UPDATE_USER_BEGIN })
        try {

            const res = await authFetch.patch("/user", currentUser)

            const { user, token } = res.data;
            let profession;
            if (user) {
                profession = user.profession
            }

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: { user, profession, token },
            });

            addUserToLocalStorage({ user, token, profession, })

        }
        catch (error) {
            if (error.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: error.response.data.msg },
                });
            }
        }
        clearAlert();
    }

    const handleChange = ({ name, value }) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: { name, value },
        })
    }

    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }

    const createExpense = async () => {
        dispatch({ type: CREATE_EXP_BEGIN })
        try {

            const { typeOp, catagoryType, amount, refrence, description, date } = state
            const exData = {
                type: typeOp,
                catagory: catagoryType,
                amount,
                refrence,
                description,
                date
            }
            const res = await authFetch.post('/expense', exData);

            dispatch({
                type: CREATE_EXP_SUCCESS,
            });

            // call function instead clearValues()
            dispatch({ type: CLEAR_VALUES });
            console.log(res);

        } catch (error) {
            dispatch({
                type: CREATE_EXP_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert();
    }

    const getExpense = async () => {

        const { search, type, page } = state;

        let url = `/expense?page=${page}&type=${type}`

        if (search) {
            url = url + `&search=${search}`;
        }


        dispatch({ type: GET_EXP_BEGIN })
        try {
            const res = await authFetch.get(url)
            const { expense, totalExpense, noOfPage } = res.data


            dispatch({
                type: GET_EXP_SUCCESS,
                payload: {
                    expense,
                    totalExpense,
                    noOfPage
                },
            })
        } catch (error) {
            console.log(error.response)
            logoutUser()
        }
        clearAlert()
    }

    useEffect(() => {
        getExpense()
    }, []);

    const setEditExp = (id) => {
        console.log(id);
        dispatch({ type: SET_EDIT_EXP, payload: { id } })
    }

    const editExp = async () => {
        dispatch({ type: EDIT_EXP_BEGIN });

        try {
            const { typeOp, catagoryType, amount, refrence, description, date } = state;

            const exData = {
                type: typeOp,
                catagory: catagoryType,
                amount,
                refrence,
                description,
                date
            }

            await authFetch.patch(`expense/${state.editExpId}`, exData);

            dispatch({
                type: EDIT_EXP_SUCCESS,
            });
            dispatch({ type: CLEAR_VALUES });

        } catch (error) {
            if (error.response.status === 401) return;
            dispatch({
                type: EDIT_EXP_ERROR,
                payload: { msg: error.response.data.msg },
            });
        }
        clearAlert()
    }


    const deleteExp = async (id) => {
        dispatch({ type: DELETE_EXP_BEGIN })

        try {
            await authFetch.delete(`expense/${id}`);

            getExpense();

        } catch (error) {
            console.log(error.response);
            // logoutUser()
        }
        clearAlert()
    }

    // show stats

    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN })
        try {
            const res = await authFetch('/expense/stats')
            const obj = res.data.stats;
            let income;
            let expense;

            obj.forEach(el => {
                if (el._id === "income") {
                    income = el;
                }
                if (el._id === "expense") {
                    expense = el;
                }
            });
            const data = {
                income,
                expense
            }


            dispatch({
                type: SHOW_STATS_SUCCESS,
                payload: {
                    stats: data
                    // monthlyApplications: data.monthlyApplications,
                },
            })
        } catch (error) {
            console.log(error.response)
            // logoutUser()
        }

        clearAlert()
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    };

    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: { page } })
    }



    return (
        <AppContext.Provider
            value={{
                ...state, displayAlert, setUpUser, toggleSidebar, logoutUser, updateUser, handleChange, clearValues, createExpense, getExpense, setEditExp, editExp, deleteExp, showStats, clearFilters, changePage
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

// make sure use
export const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider }