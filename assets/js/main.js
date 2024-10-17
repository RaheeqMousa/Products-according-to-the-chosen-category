/*.....................................................Change from light/dark mode......................................................*/

 function changeLight(){
    document.querySelector('body').classList.toggle("dark-mode");

    let icon=document.querySelector('.ChangeMode .SwitchMode i');
    if (document.body.classList.contains("dark-mode")) {
        // Change the icon to sun (click to get dark mode)
        icon.className = "fa-solid fa-sun";
    } else {
        // Change the icon to moon (click to get light mode)
        icon.className = "fa-solid fa-moon";
    }
}

document.querySelector(".SwitchMode").onclick=changeLight;

/*.....................................................Delete the Notification Bar......................................................*/

function DeleteNotification(){
    document.querySelector(".NotificationBar").remove();  //selects the notification bar div and remove it
}

document.querySelector(".DeleteNotificationButton").onclick=DeleteNotification; //if user clicked on the delete button i will delete the notofication

/*..................................................... GET AND DISPLAY CATEGORIES .....................................................*/

const getCategories = async () => {     /* THIS FUNCTION RETURN THE CATEGORIES WE GOT FROM THE API */
    const {data} = await axios.get('https://dummyjson.com/products/category-list');
    // I WROTE {data} SO THE THE DATA WE GOT BE STORED INSIDE AN ARRAY
    return data;
}

const displayCategoryList= async()=>{   /* THIS DISPLAYS THE CATEGORIES TO THE HTML FILE */

    document.querySelector('.loader').classList.remove("stop-loader");
    document.querySelector('.loader-container').classList.remove("stop-loader");
    const foot = document.querySelector('footer');
    foot.style.marginTop='250px';


    try{
        const categories=await getCategories();

        const result=categories.map(function(category){
        
            return `
            <div class="category">
                <h2>${category}</h2>
                <a href="categoryDetails.html?category=${category}">Details</a>
            </div> 
            `;
    
        }).join('');  // THE DATA WE GOT IS DISPLAYED AND THERE IS ',' BETWEEN THEM SO WE JOIN THE DATA WITH '' (EMPTY QUOTES)
    
        document.querySelector('.categories .row').innerHTML = result;
        
    }catch(e){
        console.log(e);
    }finally{
        document.querySelector('.loader').classList.add("stop-loader");
        document.querySelector('.loader-container').classList.add("stop-loader");
        const foot = document.querySelector('footer');
        foot.style.marginTop='0px';
    }
    
}

displayCategoryList();


/*..................................................... GET AND DISPLAY PRODUCTS .....................................................*/

const getTotalNumberOfProducts = async() =>{     /* THIS FUNCTION RETURN THE TOTAL NUMBER OF PRODUCTS */
    
    const {data} = await axios.get(`https://dummyjson.com/products`);
    /* I WROTE {data} SO THE THE DATA WE GOT BE STORED INSIDE AN ARRAY */

    return data.total;

}

const getProducts = async(page) =>{     /* THIS FUNCTION RETURN ALL THE PRODUCTS WE GOT FROM THE API */
    
    const skip=(page-1)*10;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    // I WROTE {data} SO THE THE DATA WE GOT BE STORED INSIDE AN ARRAY

    return data.products;

}

const displayProductList= async(page = 1)=>{    /* THIS FUNCTION DISPLAYS ALL THE PRODUCTS WE GOT FROM THE API TO THE HTML FILE */

    document.querySelector('.loader').classList.remove("stop-loader");
    document.querySelector('.loader-container').classList.remove("stop-loader");
    const foot = document.querySelector('footer');
    foot.style.marginTop='250px';

    try{
        const products=(await getProducts(page));
        // I want to display 10 products in the page (the limit of products is 10 ) 
        const numberOfPages=Math.ceil((await getTotalNumberOfProducts())/10); 

        const result= products.map(function(p){
            return `
                <div class="product">
                    <img src="${p.thumbnail}" alt="this is product img"></img>
                    <h3>${p.title}</h3>
                </div> 
            `;

        }  ).join('');

            document.querySelector('.products .container .row').innerHTML=result;

            /* This part of code to display the pagination to the page under the products */
            let paginationLink=``;

            if(page==1){
                // If the user in the first page the previous button must be disabled 
                paginationLink=`<button class="page-link" onClick=displayProductList('${page-1}') disabled>&laquo</button>`;
            }else{
                paginationLink=`<button class="page-link" onClick=displayProductList('${page-1}') >&laquo</button>`;
            }

            for(let i=1;i<=numberOfPages;i++){
                //if the page 1 is selected then the background of the button whice have the number on it must change its background
                // when the button is clicked I will show the data for the specific page number that clicked on 
                paginationLink+=`<button  class="page-link ${i==page?'active-page':''}" onClick=displayProductList('${i}')>${i}</button>`; 
            }

            if(page==numberOfPages){
                // If the user in the last page the next button must be disabled 
                paginationLink += `<button  class="page-link" onClick=displayProductList('${parseInt(page)+1}') disabled>&raquo</button>`;
            }else{
                paginationLink+=`<button class="page-link" onClick=displayProductList('${parseInt(page)+1}') >&raquo</button>`;
            }

            
            document.querySelector(".pagination-container").innerHTML = paginationLink;
            
    }catch(e){
        document.querySelector('.products .container .row').innerHTML=`<p>${e}</p>`
    }finally{
        document.querySelector('.loader').classList.add("stop-loader");
        document.querySelector('.loader-container').classList.add("stop-loader");
        const foot = document.querySelector('footer');
        foot.style.marginTop='0px';
    }


}
displayProductList();
