export function addToCart(item) {
  return new Promise(async(resolve) =>{
  const response = await fetch('https://mern-ecommerce-tan.vercel.app/cart',{
    method: 'POST',
    body: JSON.stringify(item),
    headers:{
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  })
  const data = await response.json();
  resolve({data})
    });
}

export function update(update) {
  return new Promise(async(resolve) =>{
  const response = await fetch('https://mern-ecommerce-tan.vercel.app/cart/'+update.id,{
    method: 'PATCH',
    body: JSON.stringify(update),
    headers:{
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  })
  const data = await response.json();
  resolve({data})
    });
} 
export function deleteItemsFromCart(itemId) {
  return new Promise(async(resolve) =>{
  const response = await fetch('https://mern-ecommerce-tan.vercel.app/cart/'+itemId,{
    method: 'DELETE',
    headers:{
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  })
  await response.json();
  resolve({data : {id:itemId}})
    });
}

export function fetchItemsByUserId() {
  return new Promise(async(resolve) =>{
  const response = await fetch('https://mern-ecommerce-tan.vercel.app/cart',
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
  const data = await response.json();
  resolve({data})
    });
}

export async function resetCart() {
  return new Promise(async(resolve) =>{
    const response = await fetchItemsByUserId();
    const items = response.data;
    for(let item of items){
      await deleteItemsFromCart(item.id)
    }
    resolve({status:'success'});
  });
}