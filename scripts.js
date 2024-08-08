class ModalModel {
    constructor(content) {
        this.content = content;
        this.onClickOk = null;
        this.onClose = null;
        this.onEdinContent = null;
    }

    getContent() {
        return this.content;
    }

    setContent(content) {
        this.content = content;
    }

    setClickOk(callback) {
        this.onClickOk = callback;
    }

    setClose(callback) {
        this.onClose = callback;
    }

    setEditContent(callback) {
        this.onEdinContent = callback;
    }

    getHandlerClickOk() {
        return this.onClickOk;
    }

    getHandlerClose() {
        return this.onClose;
    }

    getHandlerEditContent() {
        return this.onEdinContent;
    }
}

class ModalView {
    constructor(model) {
        this.model = model;
    }

    render() {
        const content = this.model.getContent();
        const modalHtml = `
            <div class="modal__overlay">
                <div class="modal_overlay-content">
                    <div class="modal__overlay-content-body">
                        ${content}
                    </div>
                    <div class="modal__overlay-content-buttons">
                        <button class="modal__edit-button modal__button">Change Content</button>
                        <button class="modal__ok-button modal__button">Ok</button>
                        <button class="modal__close-button modal__button">Close</button>
                    </div>
                </div>
            </div>
        `;

        const modalContainer = document.querySelector('.modal');
        modalContainer.innerHTML = modalHtml;
        modalContainer.style.display ='flex';

        document.querySelector('.modal__ok-button').addEventListener('click', () => {
            const handler = this.model.getHandlerClickOk();
            handler?.();
        });

        document.querySelector('.modal__close-button').addEventListener('click', () => {
            modalContainer.innerHTML = '';
            const handler = this.model.getHandlerClose();
            handler?.();
        });

        document.querySelector('.modal__edit-button').addEventListener('click', () => {
            const handler = this.model.getHandlerEditContent();
            handler?.();
        });
    }
}

class ModalController {
    constructor() {
        const modalContent = '<h2>This is a modal!</h2><p>You can change this content.</p>';
        this.model = new ModalModel(modalContent);

        const okCallback = () => {
            alert('you click ok!');
        };

        const closeCallback = () => {
            console.log('Modal was closed!!!');
        };

        const editContentCallback = () => {
            const newContent = prompt('Enter new content for modal window: ', this.model.getContent());
            if (newContent !== null) {
                this.model.setContent(`<p>${newContent}</p>`);
                this.open();
            }
        }

        this.model.setClickOk(okCallback);
        this.model.setClose(closeCallback);
        this.model.setEditContent(editContentCallback);

        this.view = new ModalView(this.model);
    }

    open() {
        this.view.render();
    }
}

const modalController = new ModalController();

document.querySelector('.open-modal-button').addEventListener('click', () => {
    modalController.open();
});