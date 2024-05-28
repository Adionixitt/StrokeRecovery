class Popup{
    constructor(args) {
        this.titleText = args.title
        this.contents = args.contents
        this.headingIcon = args.icon
    }

    Show(titleText, headingIcon, contents){
        // Задаём элементы нашего Popup-окна
        let wrapper = document.createElement('div');
            wrapper.classList.add('popup-wrapper');
            wrapper.addEventListener('click', (e)=>{
                if(e.target == wrapper){
                    wrapper.style.animation = 'softUnblur';
                    wrapper.style.animationDuration = '1s';
                    container.style.animation = 'flyToBottom';
                    container.style.animationDuration = '.75s';
                    container.style.animationFillMode = 'both';
                    setTimeout(()=>{
                        document.querySelector('html').removeChild(wrapper);
                    }, 1000);
                }
            });

        let container = document.createElement('div');
            container.classList.add('popup-container');
        let headingContainer = document.createElement('div');
            headingContainer.classList.add('heading-container');
        let icon = document.createElement('span');
            icon.classList.add("material-symbols-outlined");
        let title = document.createElement('h1');
        let content = document.createElement('div');
            content.classList.add("popup-content");

        // Вкладываем элементы друг в друга
        headingContainer.append(icon);
        headingContainer.append(title);
        container.append(headingContainer);
        container.append(content);
        wrapper.append(container);
        
        // Подставляем указанные данные
        icon.innerHTML = this.headingIcon;
        title.innerHTML = this.titleText;
        content.innerHTML = this.contents;


        // Выводим popup
        document.querySelector('html').append(wrapper);
    }
}

export default Popup;