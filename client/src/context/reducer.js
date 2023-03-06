import { DISPLAY_ALERT, CLEAR_ALERT, SETUP_USER_BEGIN, SETUP_USER_SUCCESS, SETUP_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, HANDLE_CHANGE, CLEAR_VALUES, CREATE_EXP_BEGIN, CREATE_EXP_SUCCESS, CREATE_EXP_ERROR, GET_EXP_BEGIN, GET_EXP_SUCCESS, EDIT_EXP_BEGIN, SET_EDIT_EXP, EDIT_EXP_SUCCESS, EDIT_EXP_ERROR, DELETE_EXP_BEGIN, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_FILTERS, CHANGE_PAGE } from "./actions.js"
import { initialState } from "./appContext";

const reducer = (state, action) => {

    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: "danger",
            alertText: "Please provide all values!",
        };
    }
    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: "",
        };
    }

    // toggle side bar
    if (action.type === TOGGLE_SIDEBAR) {
        return { ...state, showSidebar: !state.showSidebar };
    }


    // register/login process
    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            showAlert: false,
            alertType: "",
            alertText: "",
        };
    }

    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            profession: action.payload.proffesion,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Redirecting...",
        }
    }

    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    // logout user
    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            profession: "",

        };
    }

    // update user

    if (action.type === UPDATE_USER_BEGIN) {
        return { ...state, isLoading: true }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            profession: action.payload.profession,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
        }
    }
    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg,
        }
    }

    // handle chage add daynamic value 
    if (action.type === HANDLE_CHANGE) {
        return { ...state, [action.payload.name]: action.payload.value };
    }

    // cleare all value
    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            typeOp: "all",
            catagoryType: "",
            amount: '',
            refrence: "",
            date: '',
            description: "",
        };
        return { ...state, ...initialState };
    }

    // add expense 
    if (action.type === CREATE_EXP_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === CREATE_EXP_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Created!",
        };
    }
    if (action.type === CREATE_EXP_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    // get all expense
    if (action.type === GET_EXP_BEGIN) {
        return { ...state, isLoading: true, showAlert: false };
    }

    if (action.type === GET_EXP_SUCCESS) {

        return {
            ...state,
            isLoading: false,
            expense: action.payload.expense,
            totalExpense: action.payload.totalExpense,
            numOfPages: action.payload.noOfPage,
        };
    }

    // set edit expense
    if (action.type === SET_EDIT_EXP) {
        console.log(action.payload.id);

        const exp = state.expense.find((ex) => ex._id === action.payload.id);
        console.log(exp);
        const { type, amount, catagory, createdAt, refrence, _id, description } = exp;
        return {
            ...state,
            isEditing: true,
            editExpId: _id,
            typeOp: type,
            amount,
            refrence,
            date: createdAt,
            description,
            catagoryType: catagory,
        };
    }

    // edit expense
    if (action.type === EDIT_EXP_BEGIN) {
        return { ...state, isLoading: true };
    }
    if (action.type === EDIT_EXP_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "success",
            alertText: "Updated!!",
        };
    }
    if (action.type === EDIT_EXP_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        };
    }

    // delete expense
    if (action.type === DELETE_EXP_BEGIN) {
        return { ...state, isLoading: true };
    }

    // show stats
    if (action.type === SHOW_STATS_BEGIN) {
        return { ...state, isLoading: true, showAlert: false };
    }
    if (action.type === SHOW_STATS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            stats: action.payload.stats,
            //   monthlyApplications: action.payload.monthlyApplications,
        };
    }

    // clear filter in search container

    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            search: "",
            amounts: '',
            type: 'all',
        };
    }

    // pagination 
    if (action.type === CHANGE_PAGE) {
        return { ...state, page: action.payload.page };
    }


};
export default reducer;