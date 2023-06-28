export function pasteNotAllowFunc(xid) {
    let myInput = document.getElementById(xid);
    myInput.onpaste = (e) => e.preventDefault();
}
