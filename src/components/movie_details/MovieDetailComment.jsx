import React, { useState } from "react";
import SideNavAvatar from "../side_nav/SideNavAvatar";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "./styles/MovieDetail.module.css";

const MovieDetailComment = ({ comment, setComments, setCurrentMovie }) => {
    const [delConfirm, setDelConfirm] = useState(false);
    /*
    Delete handle function
    */
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${comment?.id}`);

            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter(
                    (currentComment) => currentComment.id !== comment?.id
                ),
            }));
            setCurrentMovie((prevCurrentMovie) => [
                {
                    ...prevCurrentMovie[0],
                    comments_count: prevCurrentMovie[0].comments_count - 1,
                },
            ]);
            setDelConfirm(false);
        } catch (err) {}
    };

    return delConfirm ? (
        <div
            className={`${styles.comment_confirm_main_container} flex-container`}
        >
            <div
                className={`${styles.comment_confirm_container} v-flex-container`}
            >
                <h4 className={`${styles.comment_confirm_text}`}>
                    Delete this comment!
                </h4>
                <div className={`flex-container`}>
                    <button
                        className={`${styles.comment_delete_button} button`}
                        onClick={handleDelete}
                    >
                        Confirm
                    </button>
                    <button
                        className={`${styles.comment_cancel_button} button`}
                        onClick={() => setDelConfirm(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className={`${styles.comment_container} flex-container`}>
            <div
                className={`${styles.comment_avatar_container} v-flex-container`}
            >
                <SideNavAvatar
                    profile_avatar={comment?.profile_avatar}
                    owner_name={comment?.owner_name}
                    width={70}
                    greeting={null}
                    show_name={true}
                />
            </div>
            <div
                className={`${styles.comment_text_main_container} v-flex-container`}
            >
                <div
                    className={`${styles.comment_text_container} v-flex-container`}
                >
                    <h4 className={`${styles.comment_date}`}>
                        {comment?.created_at}
                    </h4>

                    <p className={`${styles.comment_text}`}>
                        {comment?.comment_body}
                    </p>
                </div>
                <div
                    className={`${styles.comment_button_container} flex-container`}
                >
                    {comment?.is_owner && (
                        <button
                            className={`${styles.comment_delete_button} button`}
                            onClick={() => setDelConfirm(true)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailComment;
