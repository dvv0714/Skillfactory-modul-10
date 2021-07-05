/*Сделайте кнопку, клик на которую будет выводить 
данные о размерах экрана с помощью alert. */


let btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    let measure = `Ширина: ${window.innerWidth},Высота: ${window.innerHeight}`
    alert(measure)
})

// Если нужно было найти просто данные об экране то:

// let btn = document.getElementById('btn')

// btn.addEventListener('click', () => {
//     let measure = `Ширина: ${window.screen.width},Высота: ${window.screen.height}`
//     alert(measure)
// })