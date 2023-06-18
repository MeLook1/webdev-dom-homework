var now = new Date().toLocaleString().slice(0, -3);

const addButton = document.getElementById("add-form-button");
const listElement = document.getElementById("list");
const addFormName = document.getElementById("add-form-name");
const addFormText = document.getElementById("add-form-text");
const container = document.querySelector(".container");
const addFormBox = document.querySelector(".add-form");
const loader = document.querySelector("p");



let comments = [];
//Отправляем GET-запрос

const fetchAndRenderComments = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/MeLook/comments", {
        method: "GET"
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



//Злостно (или нет) отвечаем на коммент
const answerComment = () => {
    const boxCommentsTexts = document.querySelectorAll('.comment');
    boxCommentsTexts.forEach((comment) => {
        comment.addEventListener('click', () => {
            const author = comment.querySelector('.comment-header div:first-child').textContent;
            const text = comment.querySelector('.comment-text').textContent;
            addFormText.value = ` > Автор: ${author} \n ${text} \n Ответ: `;
        });
    });
}
answerComment();

//Ставим лайки комментам
const initLikeButtonListeners = () => {
    const likeButtonsElements = document.querySelectorAll(".like-button");
    for (const likeButtonElement of likeButtonsElements) {
        likeButtonElement.addEventListener("click", (event) => {
            const index = likeButtonElement.dataset.index;
            if (comments[index].isLiked) {
                comments[index].likes--;
                comments[index].isLiked = false;
            } else {
                comments[index].likes++;
                comments[index].isLiked = true;

            }


            console.log("нажал");
            renderComments();
            event.stopPropagation();
        });
    }
};


//Рендер комментов
const renderComments = () => {
    var now = new Date().toLocaleString().slice(0, -3);
    const commentsHtml = comments
        .map((comment, index) => {
            return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" >${comment.likes}</span>
            <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index = ${index} data-id=${comment.id}></button>
          </div>
        </div>
      </li>`;
        })
        .join("");
    listElement.innerHTML = commentsHtml;
    initLikeButtonListeners();
    answerComment();
};
fetchAndRenderComments();
renderComments();


//Пишется коммент
addButton.addEventListener("click", () => {
    addFormName.classList.remove("error");
    addFormText.classList.remove("error");
    if (addFormName.value === "" || addFormText.value === "") {
        addFormName.classList.add("error");
        addFormText.classList.add("error");
        alert("Поля не заполнены");
        return;
    }
    addFormBox.classList.add("hidden");
    loader.className = "loader";
    loader.textContent = "Загрузка вашего комментария...";
    container.appendChild(loader);
    fetch("https://wedev-api.sky.pro/api/v1/MeLook/comments", {
        method: "POST",
        body: JSON.stringify({
            name: addFormName.value,
            date: now,
            text: addFormText.value,
            likes: "0",
            isLiked: false,
            forceError: true,
        }),
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
            return fetchAndRenderComments();
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

        })

    renderComments();

});

console.log("It works!");