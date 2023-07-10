export function fetchProductsByFilters(filter,sort,pagination) {
  let queryString = '';
  for(let key in filter){
    const categoryValue = filter[key];
    if(categoryValue.length){
      const lastCategoryValue = categoryValue[categoryValue.length - 1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async(resolve) =>{
  const response = await fetch('/products?'+queryString);
  const data = await response.json();
  const totalPages = await response.headers.get('X-Total-Count');
  resolve({data:{products:data,totalItems:totalPages}})
  resolve({data})
    });
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/categories') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/brands') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async (resolve) =>{
    //TODO: we will not hard-code server URL here
    const response = await fetch('/products/'+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function createProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products", {
      method: "POST",
      body: JSON.stringify(productData),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async(resolve) =>{
  const response = await fetch('/products/'+update.id,{
    method: 'PATCH',
    body: JSON.stringify(update),
    headers:{
      'content-type': 'application/json'
    }
  })
  const data = await response.json();
  resolve({data})
    });
} 