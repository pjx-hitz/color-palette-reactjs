import types from "./types";
import { setUserPalettes, resetPalettes } from "../palettes/actions";
import { setAuthToken, apiCall } from "../../service/axios";
import { setJwtTokenToLocalStorage } from "../../utils/userHelper";

export const setCurrentUser = (user) => ({
    type: types.SET_USER,
    user,
});

export const login = (email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(setUserPalettes([]));
        return apiCall("post", "/login", { email, password })
            .then((res) => {
                setJwtTokenToLocalStorage(res.token);
                setAuthToken(res.token);
                dispatch(setUserPalettes(res.palettes));
                dispatch(
                    setCurrentUser({
                        id: res.id,
                        username: res.username,
                    })
                );
                resolve();
            })
            .catch((error) => reject(error));
    });
};

export const logout = () => (dispatch) => {
    localStorage.clear();
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    dispatch(resetPalettes());
};
