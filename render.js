import { initLikeButtonListeners, answerComment, appEl } from "./script.js";
import { comments, getAndRenderComments, sendAndRenderComments } from "./api.js";


//Рендер комментов
const renderComments = () => {
   
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
    const appHtml = `
                    <div class="container">
                    <p class="loader">Загрузка комментариев...</p>
                    <ul class="comments hidden" id="list">
                    ${commentsHtml}
                    </ul>
                    <div class="add-form center">
                        <strong>Логин</strong>
                        <input type="text" class="add-form-name" placeholder="Введите логин" id="input-login" />
                        <br/>
                        <strong>Пароль</strong>
                        <input type="text" class="add-form-name" placeholder="Введите пароль" id="input-pass" />
                        <br/>
                        <div class="add-form-row">
                            <button class="add-form-button" id="input-button">Войти</button>
                        </div>
                    </div>
                    <div class="add-form">
                        <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="add-form-name" />
                        <textarea type="textarea" class="add-form-text" placeholder="Введите ваш комментарий" rows="4"
                            id="add-form-text"></textarea>
                        <div class="add-form-row">
                            <button class="add-form-button" id="add-form-button">Написать</button>
                        </div>
                    </div>
                </div>`

    appEl.innerHTML = appHtml;
    
    
    
};

export { renderComments };