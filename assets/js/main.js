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
    document.querySelector(".NotificationBar").remove();
}

document.querySelector(".DeleteNotificationButton").onclick=DeleteNotification;

/*..................................................... GET AND DISPLAY CATEGORIES .....................................................*/

const getCategories = async () => {     /* THIS FUNCTION RETURN THE CATEGORIES WE GOT FROM THE API */
    const {data} = await axios.get('https://dummyjson.com/products/category-list');
    /* I WROTE {data} SO THE THE DATA WE GOT BE STORED INSIDE AN ARRAY */
    return data;
}

const displayCategoryList= async()=>{   /* THIS DISPLAYS THE CATEGORIES TO THE HTML FILE */
    const categories=await getCategories();

    const result=categories.map(function(category){
        
        console.log(category);
        return `
        <div class="category">
            <h2>${category}</h2>
            <a href="categoryDetails.html?category=${category}">Details</a>
        </div> 
        `;

    }).join('');  /* THE DATA WE GOT IS DISPLAYED AND THERE IS ',' BETWEEN THEM SO WE JOIN THE DATA WITH '' (EMPTY QUOTES) */

    document.querySelector('.categories .row').innerHTML = result;
}

displayCategoryList();


/*..................................................... GET AND DISPLAY PRODUCTS .....................................................*/


const getProducts = async() =>{     /* THIS FUNCTION RETURN ALL THE PRODUCTS WE GOT FROM THE API */
    const {data} = await axios.get('https://dummyjson.com/products');
    /* I WROTE {data} SO THE THE DATA WE GOT BE STORED INSIDE AN ARRAY */

    return data

}

const displayProductList= async()=>{    /* THIS FUNCTION DISPLAYS ALL THE PRODUCTS WE GOT FROM THE API TO THE HTML FILE */

    const products=await getProducts();
    const result= products.products.map(function(p){

        return `
            <div class="product">
                <img src="${p.thumbnail}" alt="this is product img"></img>
                <h3>${p.title}</h3>
            </div> 
        `;

    }
    ).join('');

    document.querySelector('.products .row').innerHTML=result;
}

displayProductList();
