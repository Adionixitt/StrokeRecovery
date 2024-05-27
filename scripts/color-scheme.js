document.addEventListener('DOMContentLoaded', ()=>{
    const html = document.querySelector("html");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark-theme');
    }
    
    let themeToggleBtn = document.querySelector('#theme-toggle');
    function changeBtnIcon(){
        themeToggleBtn.innerHTML = (html.classList.contains('dark-theme')?'<span class="material-symbols-outlined">dark_mode</span>':'<span class="material-symbols-outlined">light_mode</span>');
    }
    changeBtnIcon();
    themeToggleBtn.addEventListener('click', ()=>{
        html.classList.toggle('dark-theme');
        changeBtnIcon();
    });
    
});