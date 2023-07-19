// A mock function to mimic making an async request for data
export function addOrder(order) {
  return new Promise(async(resolve) =>{
  const response = await fetch('https://mern-ecommerce-tan.vercel.app/orders', {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  resolve({data})
    });
}

export async function fetchAllOrders(pagination) {
  let queryString = '';
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async(resolve) =>{
  const response = await fetch('https://mern-ecommerce-tan.vercel.app/orders?'+queryString,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  const data = await response.json();
  let totalOrders = await response.headers.get('X-Total-Count');
  resolve({data: {orders:data, totalOrders:+totalOrders}});
    });
}

export function updateOrder(update) {
  return new Promise(async(resolve) =>{
  const response = await fetch('https://mern-ecommerce-tan.vercel.app/orders/'+update.id, {
    method: "PATCH",
    body: JSON.stringify(update),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  resolve({data})
    });
}