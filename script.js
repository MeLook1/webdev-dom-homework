import { getAndRenderComments } from "./api.js";
import { renderComments } from "./render.js";

const renderApp = () => {
    renderComments({ comments, handleCommentLikeClick, handleCommentAnswerClick });
};
const loader = document.createElement('div');
var now = new Date().toLocaleString().slice(0, -3);
const appEl = document.getElementById("app");
loader.className = "loader";
loader.innerText = "Загрузка вашего комментария...";
appEl.appendChild(loader);

export const initApp = () => {
    getAndRenderComments()
        .then((appComments) => {
            comments = appComments;
            renderApp();
        })
        .then((data) => {
            loader.style.display = 'none';
        });
}

let comments = [];
// Ставим лайки комментам
const handleCommentLikeClick = (event) => {
    event.stopPropagation();
    const index = event.target.dataset.index;
    const likesContainer = event.target.closest('.comment-footer');
    const likesCounter = likesContainer.querySelector('.likes-counter');
    let countInLike = likesCounter.textContent;
    if (comments[index].isLike === true) {
        countInLike = (+countInLike) -1;
        comments[index].isLike = false;
    } else {
        countInLike = (+countInLike) + 1;
        comments[index].isLike = true;
    }
    comments[index].like = countInLike;
    renderApp();
};

//Отвечаем
let commentAnswer = null;
const handleCommentAnswerClick = (event) => {
    const textElement = document.getElementById("add-text");
    commentAnswer = event.target.dataset.index;
    textElement.value = `> ${comments[commentAnswer]
        }`
        + `\n\n${comments[commentAnswer]
        }`

};
initApp();