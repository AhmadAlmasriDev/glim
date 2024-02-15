import { axiosReq } from "../api/axiosDefaults";
import jwtDecode from "jwt-decode";

export const fetchMoreData = async (resource, setResource) => {
    try {
        const { data } = await axiosReq.get(resource.next);
        setResource((prevResource) => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id)
                    ? acc
                    : [...acc, cur];
            }, prevResource.results),
        }));
    } catch (err) {}
};

export const seatInfo = (currentSeat, currentPrice) => {
    const rows = ["A", "B", "C", "D", "E", "F", "G"];
    const seat_per_row = 12;
    let row = rows[-Math.floor(currentSeat / -seat_per_row) - 1];
    let number =
        currentSeat -
        seat_per_row * (-Math.floor(currentSeat / -seat_per_row) - 1);
    let type = "Standard";
    if (row === "G") {
        type = "VIP";
        currentPrice += 10;
    }
    return {
        row: row,
        number: number,
        type: type,
        price: currentPrice,
    };
};

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
};

export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};
