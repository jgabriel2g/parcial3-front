import Swal from "sweetalert2";
import storage from "../Storage/storage";
import axios from "axios"
export const showAlert = (msj, icon) => {
  Swal.fire({
    title:msj,
    icon:icon,
    buttonsStyling:true
  })
}

export const sendRequest = async(method, params, url, redir='', token = true) => {
  axios.defaults.xsrfCookieName = null;
  axios.defaults.xsrfHeaderName = null;

  if(token){
    const authToken = storage.get('authToken');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
  }
  let res;
  await axios({method:method, url:url, data:params}).then(
    response => {

      res = response,
      (method != 'GET') ? showAlert('Cambio exitoso', 'success'):'',
      setTimeout( () =>
      (redir !== '') ? window.location.href = redir : '', 2000)
    })
  return res
}

export const confirmation = async(name, url, redir) => {
  const alert = Swal.mixin({buttonsStyling:true});
  alert.fire({
    title: 'Are you sure delete ' + name + '?',
    icon: 'question', showCancelButton:true,
    confirmButtonText: '<i class="fa-solid fa-check></i> Yes, delete',
    cancelButtonText:'<i class="fa-solid fa-ban></i> Cancel'
  }).then((result) => {
    if(result.isConfirmed){
      sendRequest('DELETE', {}, url, redir)
    }
  })

}

export default showAlert;
