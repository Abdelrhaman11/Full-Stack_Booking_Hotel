   
   
export const updateUserInLocalStorage = (user , next) => {
        if(window.localStorage.getItem("token")){
            let token = JSON.parse(localStorage.getItem("token"));
            token.user = user
            localStorage.setItem("token" , JSON.stringify(token))
            next()
        }
    }

export const currencyFormatter = (data) => {
  return (data.amount/100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
}; 

export const diffDays =(from , to) =>{
  const day = 24*60*60*1000;
  const start = new Date(from)
  const end = new Date(to)
  return Math.round(Math.abs(end - start) / day);
}


