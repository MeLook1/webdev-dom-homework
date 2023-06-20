import { listElement, initLikeButtonListeners, answerComment } from "./script.js";
import { comments } from "./api.js";


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
export { renderComments, listElement };