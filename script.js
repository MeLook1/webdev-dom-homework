import { getAndRenderComments, comments, sendAndRenderComments } from "./api.js";
import { renderComments } from "./render.js";

var now = new Date().toLocaleString().slice(0, -3);


const appEl = document.getElementById("app");

renderComments();
getAndRenderComments();

const addButton = document.getElementById("add-form-button");
const listElement = document.getElementById("list");
const addFormName = document.getElementById("add-form-name");
const addFormText = document.getElementById("add-form-text");
const container = document.querySelector(".container");
const addFormBox = document.querySelector(".add-form");
const loader = document.querySelector("p");

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




sendAndRenderComments();
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

    getAndRenderComments();
    sendAndRenderComments();
    renderComments();

});

console.log("It works!");
export { initLikeButtonListeners, answerComment,appEl, listElement, addFormName, addFormText, addFormBox, loader,now };