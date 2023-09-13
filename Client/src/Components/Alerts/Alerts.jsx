import {toast} from "sonner"

function alertSuccess (success) {
  toast.success(`${success}`)
}
function alertError(error) {
    toast.error(`${error}`)
  }
function alertLoading (data) {
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  toast.promise(promise, {
  loading: 'Loading...',
  success: () => {
   if (data.includes("Error")) {
    alertError(data)
   }else{
    return `${data}`;
   }
  }
  });   
}

export {
  alertSuccess,
  alertError,
  alertLoading
}