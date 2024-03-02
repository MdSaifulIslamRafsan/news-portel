let sortView = false;
let searchByValue = 1;
document.getElementById('sortViews').addEventListener('click', () => {
    sortView = true;
    displayData(searchByValue , sortView);


});



const navBtn = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    const navContainer = document.getElementById('nav-container');
    data?.data?.news_category.forEach(element => {
        const button = document.createElement('button');
        button.classList = 'navBtn btn btn-neutral font-bold';
        button.innerText = element.category_name;
        button.setAttribute('onclick', `displayData(${element.category_id})`)
        navContainer.appendChild(button);
        button.addEventListener('click', ()=>{
            const navBtn = document.querySelectorAll('.navBtn');
            const error = document.getElementById('error');
           for (const btn of navBtn) {
            btn.classList.remove('bg-red-600');
           }
           button.classList.add('bg-red-600');
           error.classList.add('hidden');
        })

    });
}
navBtn()

const displayData = async (category_id , sortView) =>{
    searchByValue = category_id;
    category_id = '0' + category_id;
    document.getElementById('load-spinner').classList.remove('hidden');
    document.getElementById('load-spinner').classList = 'flex justify-center items-center h-screen';

    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
    const data = await res.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    





    
    if (data.data.length === 0) {
        cardContainer.innerHTML = `<div class="flex h-screen justify-center items-center flex-col">
        <img src="download.jpg" alt="Movie"/>
        <h3 class='text-center text-3xl text-red-500 font-black'>Oops!! Sorry, There is no content here</h3>
        
        </div>`;  
    }

    if (sortView) {
        data.data.sort((a,b)=>{
            a = a?.total_view;
            b = b?.total_view;
            return b - a;
        })
    }

    data.data.forEach(element => {
        const div = document.createElement('div');
        div.classList = 'card grid grid-cols-2 mt-10 card-side bg-base-100 shadow-xl';
        div.innerHTML = `
        <figure><img src="${element.image_url}" alt="Movie"/></figure>
        <div class="card-body">
            <div class="flex gap-3">
                <div class="flex-1">
                    <h2 class="card-title font-bold">${element.title}</h2>
                </div>
                <div class="w-28">
                    <p class="text-xl font-bold">${element.rating.badge}<sup class="text-xl font-bold">${element.rating.number}</sup></p>
                </div>
            </div>
          
            <p>${element.details}</p>
            <div class="flex justify-between items-center">
                <div class="flex gap-2">
                <img class="w-14 h-14 rounded-full" src="${element?.author?.img}" alt="Movie"/>
                <div>
                    <h5 class="font-bold">${element?.author?.name}</h5>
                    <p><date>${element?.author?.published_date}</date></p>
                </div>
                </div>
                <div>
                    <p>views :- ${element?.total_view}</p>
                </div>
                <div>
                    <button class="btn btn-primary">Details</button>
                </div>
            </div>
        </div>`;
        cardContainer.appendChild(div);
    });
    // console.log(data.data);
    document.getElementById('load-spinner').classList.add('hidden');
}

displayData(searchByValue);

document.getElementById('search-btn').addEventListener('click',()=>{
    const textFiled = document.getElementById('text-filed').value;
    displayData(textFiled);
    

    const searchFiledError = async (category_id) => {
        category_id = '0' + category_id;
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
        const data = await res.json();
        const error = document.getElementById('error');
        if (data.data.length === 0) {
            error.classList.remove('hidden');
        }else{
            error.classList.add('hidden');
        }
    }
    searchFiledError(textFiled);
});


