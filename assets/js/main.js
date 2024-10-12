const getCategories = async () => {
    const {data} = await axios.get('https://dummyjson.com/products/category-list');

    return data;
}

const displayCategoryList= async()=>{
    const categories=await getCategories();

    const result=categories.map(function(category){
        
        console.log(category);
        return `
        <div class="category">
            <h2>${category}</h2>
            <a href="categoryDetails.html?category=${category}">Details</a>
        </div> 
        `;

    }).join('');

    document.querySelector('.categories .row').innerHTML = result;
}

displayCategoryList();

const getProducts = async() =>{

    const {data} = await axios.get('https://dummyjson.com/products');
    return data

}

const displayProductList= async()=>{

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
