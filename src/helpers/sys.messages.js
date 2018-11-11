import toastr from 'toastr';
export default {
    toastMsg(type, msg){
        toastr.options.positionClass = 'toast-bottom-right';
        /*
        * Type: success, error, info
        * msg: String
        */
        toastr[type](msg);
    }

}