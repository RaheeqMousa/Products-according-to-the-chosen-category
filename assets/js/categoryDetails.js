/*................................ GET AND DISPLAY PRODUCTS ACCORDING TO THE CLICKED ON CATEGORY ..................................*/

const getProducts = async () => {   /* THIS FUNCTION RETURNS THE CATEGORY WE CLICKED ON */
    const params = new URLSearchParams(window.location.search);
    const categorySearchedFor = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${categorySearchedFor}`);
    /* This inorder to get the data of the category that we clicked on  for */
    return data;
}


const displayProducts = async () => {   /* THIS FUNCTION DISPLAYS THE PRODUCTS OF THE CATEGORY WE CLICKED ON */
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
}

displayProducts();
