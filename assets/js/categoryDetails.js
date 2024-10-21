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

/*................................ GET AND DISPLAY PRODUCTS ACCORDING TO THE CLICKED ON CATEGORY ..................................*/

const getProducts = async () => {   /* THIS FUNCTION RETURNS THE CATEGORY WE CLICKED ON */
    const params = new URLSearchParams(window.location.search);
    const categorySearchedFor = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${categorySearchedFor}`);
    /* This inorder to get the data of the category that we clicked on  for */
    return data;
}


const displayProducts = async () => {   /* THIS FUNCTION DISPLAYS THE PRODUCTS OF THE CATEGORY WE CLICKED ON */
 
    document.querySelector('.loader').classList.remove("stop-loader");
    document.querySelector('.loader-container').classList.remove("stop-loader");
    const foot = document.querySelector('footer');
    foot.style.marginTop='290px';

  try{  
    const data = await getProducts();

    /* now we are iterating the products of the category using the map cecause of that i wrote "data.products" */
    const products = data.products.map(function (prod) {
        return `
            <div class="product">
                <p>${prod.title}</p>
                <img src="${prod.thumbnail}" />
                <span>${prod.price}</span>
            </div>
        `;
    }).join(''); /* THE DATA WE GOT IS DISPLAYED AND THERE IS ',' BETWEEN THEM SO WE JOIN THE DATA WITH '' (EMPTY QUOTES) */

        document.querySelector('.products .row').innerHTML = products;
    }catch(e){
        document.querySelector('.products .row').innerHTML =`<p>error with reading products for a such category</p>`;
    }finally{
        document.querySelector('.loader').classList.add("stop-loader");
        document.querySelector('.loader-container').classList.add("stop-loader");
        const foot = document.querySelector('footer');
        foot.style.marginTop='0px';
    }
    
}

displayProducts();

/*..................................................... SEARCH BAR .....................................................*/


