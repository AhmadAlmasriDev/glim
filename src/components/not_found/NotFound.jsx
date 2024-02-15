import React from "react";
import Asset from "../asset/Asset";
import not_found from "../../assets/not_found.svg";

const NotFound = () => {
    return (
        <article className={`wrapper flex-container`}>
            <Asset
                src={not_found}
                message={"Page not found"}
            />
        </article>
    );
};

export default NotFound;
