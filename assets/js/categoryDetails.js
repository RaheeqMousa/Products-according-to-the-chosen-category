const getProducts = async () => {
    const params = new URLSearchParams(window.location.search);
    const categorySearchedFor = params.get('category');
    const {data} = await axios.get(`https://dummyjson.com/products/category/${categorySearchedFor}`);
    /* This inorder to get the data of the category that we clicked on  for */
    return data;
}


const displayProducts = async () => {
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
    }).join('');

    document.querySelector('.products .row').innerHTML = products;
}

displayProducts();
