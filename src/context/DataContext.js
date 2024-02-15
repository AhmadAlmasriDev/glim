import { createContext, useState, useEffect, useMemo } from "react";

import { axiosReq, axiosRes } from "../api/axiosDefaults";

import { useHistory } from "react-router-dom";
import axios from "axios";
import "../api/axiosDefaults";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [viewSideNav, setViewSideNav] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();
    const [currentBook, setCurrentBook] = useState({});
    const [showTrailer, setShowTrailer] = useState(false);
    const [mainPage, setMainPage] = useState(false);

    const handleToggleSideBar = () => setViewSideNav(!viewSideNav);

    const handleMount = async () => {
        try {
            const { data } = await axiosRes.get("/dj-rest-auth/user/");
            setCurrentUser(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleMount();
    }, []);

    useMemo(() => {
        axiosReq.interceptors.request.use(
            async (config) => {
                try {
                    await axios.post("/dj-rest-auth/token/refresh/");
                } catch (err) {
                    setCurrentUser((prevCurrentUser) => {
                        if (prevCurrentUser) {
                            history.push("/signin");
                        }
                        return null;
                    });
                    return config;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        axiosRes.interceptors.response.use(
            (response) => response,
            async (err) => {
                if (err.response?.status === 401) {
                    try {
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push("/signin");
                            }
                            return null;
                        });
                    }
                    return axios(err.config);
                }
                return Promise.reject(err);
            }
        );
    }, [history]);

    return (
        <DataContext.Provider
            value={{
                viewSideNav,
                setViewSideNav,
                handleToggleSideBar,
                currentUser,
                setCurrentUser,
                currentBook,
                setCurrentBook,
                showTrailer,
                setShowTrailer,
                mainPage,
                setMainPage,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
