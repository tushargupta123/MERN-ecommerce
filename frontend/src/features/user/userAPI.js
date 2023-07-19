export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('https://mern-ecommerce-tan.vercel.app/orders/own',
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }}) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch('https://mern-ecommerce-tan.vercel.app/users/own',
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }}) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://mern-ecommerce-tan.vercel.app/users/"+update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    resolve({ data });
  });
}