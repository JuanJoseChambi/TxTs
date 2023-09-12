import {toast} from "sonner"

function alertSuccess (success) {
  toast.success(`${success}`)
}
function alertError(error) {
    toast.error(`${error}`)
  }

export {
  alertSuccess,
  alertError
}