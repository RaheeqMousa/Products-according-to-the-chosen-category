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

const getProductsData = async(page) =>{     /* THIS FUNCTION RETURN ALL THE PRODUCTS WE GOT FROM THE API */
    
    const skip=(page-1)*10;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    // I WROTE {data} SO THE THE DATA WE GOT BE STORED INSIDE AN ARRAY

    return data;

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
                    <img src="${p.thumbnail}" alt="${p.description}" class="images"></img>
                    <h3>${p.title}</h3>
                </div> 
            `;

        }  ).join('');

            document.querySelector('.products .container .row').innerHTML=result;

            

            productsPagination(page, numberOfPages);
            
            modal(page);

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

/*..................................................... PAGINATION .....................................................*/

    /* This part of code to display the pagination to the page under the products */
function productsPagination(page, numberOfPages) {

     
     let paginationLink=``;

     if(page==1){
         // If the user in the first page the previous button must be disabled 
         paginationLink=`<button class="page-link" onClick=displayProductList('${page-1}') disabled>&laquo</button>`;
     }else{
         paginationLink=`<button class="page-link" onClick=displayProductList('${page-1}') >&laquo</button>`;
     }

     startPage=Math.ceil(((page-1)/3)*3)+1;
     endPage= Math.min(startPage+2, numberOfPages);  /* in order not to exceed the number of pages */

     for(let i=startPage;i<=endPage;i++){
         //if the page 1 is selected then the background of the button whice have the number on it must change its background
         // when the button is clicked I will show the data for the specific page number that clicked on 
         paginationLink+=`<button  class="page-link ${i==page?'active-page':''}" onClick=displayProductList('${i}')>${i}</button>`; 
     }

     if(page==numberOfPages){
         // If the user in the last page the next button must be disabled 
         paginationLink += `<button  class="page-link" onClick=displayProductList('${parseInt(page)+1}') disabled>&raquo</button>`;
     }else{

         paginationLink+=`<button  class="page-link" disabled>...</button>`;

         paginationLink+=`<button class="page-link" onClick=displayProductList('${parseInt(page)+1}') >&raquo</button>`;

     }

     
     document.querySelector(".pagination-container").innerHTML = paginationLink;

}


/*..................................................... SEARCH BAR .....................................................*/



/*................................................. getProductsPriceAndStock ...........................................*/

const getProductsPriceAndStock = async () => {
    const response = await axios.get(`https://dummyjson.com/products`);
    const productInfoArray = [];

    for (let i = 0; i < response.data.products.length; i++) {
        productInfoArray.push({
            "price": response.data.products[i].price,
            "stock": response.data.products[i].stock
        });
    }

    return productInfoArray; // Return the array
}

/*................................................ Get Product Data InnerHTML for The Modal .......................................*/
const getProductDataInnerHTMLForTheModal = async (page, currentIndex) => {
    const productInfoArray = await getProductsPriceAndStock(); // Await the promise
    const selectedProduct = productInfoArray[(page - 1) * 10 + currentIndex];

    const data = `
            <p class="price">Price: ${selectedProduct.price}</p>
            <p class="stock">Stock: ${selectedProduct.stock}</p>
    `;

    return data; // Return the HTML data to be displayed in the modal
}


/*..................................................... MODAL .....................................................*/

 function modal(page){
    const modal=document.querySelector(".products-modal");
    const left=document.querySelector(".left-button");
    const right=document.querySelector(".right-button");
    const close=document.querySelector(".close-button");
    const images=Array.from(document.querySelectorAll(".images"));/* I got all the product images in the website */
    let currentIndex=0;

    images.forEach(function(img){
        img.addEventListener("click", async function(e){
            /* when i click on an image of a product the modal will display and contains the image i clicked src */
            /* also i gave that event listener to all products image  */
            modal.classList.remove("display-none-modal"); /* to let the modal display in the website */
            
            const currentImage=e.target;
            currentIndex=images.indexOf(currentImage);//the current index is known by the index of the image we clicked 

            modal.querySelector("img").setAttribute("src",e.target.src);
            //display the product data in the modal
            modal.querySelector(".productData").innerHTML=await getProductDataInnerHTMLForTheModal(page,currentIndex); 

        });
    });

    //right button
    right.addEventListener("click",async function(e){
        currentIndex++;  //inorder to get the next image index
        if(currentIndex>=images.length){
            currentIndex=0;
        }

        const src=images[currentIndex].src; //get the next image src
        modal.querySelector("img").setAttribute("src",src);
        modal.querySelector(".productData").innerHTML= await getProductDataInnerHTMLForTheModal(page,currentIndex); //display the product data in the modal
    });

    //left button
    left.addEventListener("click",async function(e){

        currentIndex--;
        if(currentIndex<0){
            currentIndex=images.length-1;
        }
        const src=images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);
        //display the product data in the modal
        modal.querySelector(".productData").innerHTML= await getProductDataInnerHTMLForTheModal(page,currentIndex); 

    });

    //right button, left button, close button WITH KEYBOARD
    document.addEventListener("keydown",async function(e){
        if(e.code=='ArrowRight'){
            currentIndex++;
            if(currentIndex>=images.length){
                currentIndex=0;
            }
            src= images[currentIndex].src;
            
            modal.querySelector("img").setAttribute("src",src);
            modal.querySelector(".productData").innerHTML= await getProductDataInnerHTMLForTheModal(page,currentIndex); //display the product data in the modal

        }else if (e.code=='ArrowLeft'){
            currentIndex--;
            if(currentIndex<0){
                currentIndex=images.length-1;
            }
            src=images[currentIndex].src;
            
            modal.querySelector("img").setAttribute("src",src);
            modal.querySelector(".productData").innerHTML= await getProductDataInnerHTMLForTheModal(page,currentIndex); //display the product data in the modal

        }else if(e.code=='Escape'){
            modal.classList.add('display-none-modal');
        }
    });

    //close button with click event
    close.addEventListener("click",function(e){

        modal.classList.add("display-none-modal");

    });

}

