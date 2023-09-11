import Swal from 'sweetalert2';

function sweetalertSuccess() {
    Swal.fire({
        title: "Aprobado" ,
        icon: "success",
        background: "aliceblue",
        toast: 'true',
        position:'top',     
        confirmButtonText:'OK',
        padding: '1,4rem',
        confirmButtonColor:'#76bc6f',
      });
}
function sweetalertError (error) {
    Swal.fire({
        title: `${error}`,
        icon: "error",
        background: "aliceblue",
        toast: 'true',
        position:'top',     
        confirmButtonText:'OK',
        padding: '1,4rem',
        confirmButtonColor:'#76bc6f',
      });
}

export {
    sweetalertSuccess,
    sweetalertError
}