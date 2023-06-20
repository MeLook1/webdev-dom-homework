import { renderComments, listElement,addFormName,addFormText,addFormBox,loader } from "./render.js";

let comments = [];
export { comments };
const host = "https://wedev-api.sky.pro/api/v2/MeLook/comments"
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";
//Отправляем GET-запрос
export const getAndRenderComments = () => {
    return fetch(host, {
        method: "GET",
        headers: {
            AAuthorization: token,
        },
    })
        .then((response) => {
            listElement.classList.remove("hidden");
            loader.classList.add("hidden");
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleString().slice(0, -3),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });

            addFormBox.classList.remove('hidden');
            comments = appComments;
            renderComments();
        })
        .catch(() => {
            alert("Проблемы с интернетом, проверьте подключение");
        });
};
getAndRenderComments();

//Отправляем POST-запрос
export const sendAndRenderComments = () => {
    fetch(host, {
        method: "POST",
        body: JSON.stringify({
            name: addFormName.value,
            date: new Date(comment.date).toLocaleString().slice(0, -3),
            text: addFormText.value,
            likes: "0",
            isLiked: false,
            // forceError: true,
        }),
        headers: {
            AAuthorization: token,
        },
    })
        .then((response) => {
            addFormBox.classList.remove("hidden");
            loader.classList.add("hidden");
            return response;
        })
        .then((response) => {
            if (response.status === 400) {
                addFormName.classList.add("error");
                addFormText.classList.add("error");
                loader.classList.add("hidden");
                throw new Error("Коротко");
            } else if (response.status === 500) {
                loader.classList.add("hidden");
                throw new Error("Сломался");
            } else {
                addFormName.value = '';
                addFormText.value = '';
                return response.json();
            }
        })
        .then(() => {
            return getAndRenderComments();
        })
        .then(() => {
            return renderComments();
        })
        .catch((error) => {
            if (error.message === "Коротко") {
                alert("Короткое имя или текст комментария, минимум 3 символа");
            } else
                if (error.message === "Сломался") {
                    alert("Сервер сломался, попробуй позже");
                } else {
                    alert("Проблемы с интернетом, проверьте подключение");
                }

        });
};