const host = "https://wedev-api.sky.pro/api/v2/MeLook/comments"

//Отправляем GET-запрос
export const getAndRenderComments = () => {
    const token = localStorage.getItem("token");
    return fetch(host, {
        method: "GET",
        forceError: false,
        headers: {
            Authorization: token,
        },
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
            return appComments;
        });   
};

//Отправляем POST-запрос
export const sendAndRenderComments = (text) => {
    const token = localStorage.getItem("token");
    fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text,
            forceError: false,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error("Коротко");
            } else if (response.status === 500) {
                throw new Error("Сломался");
            } else {
                addFormName.value = '';
                addFormText.value = '';
                return response.json();
            }
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

//Регистрация
export function registerUser({ login, password, name }) {
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Такой пользователь уже существует");
        }
        return response.json();
    });
};

//Авторизация
export function loginUser({ login, password }) {
    return fetch(" https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Неверный логин или пароль");
        }
        return response.json();
    }).then((user) => {
        localStorage.setItem('token', `Bearer ${user.user.token}`);
        localStorage.setItem('user', user.user.name);
    });

};

//Проверка
export const isUserAuthorization = () => {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
}