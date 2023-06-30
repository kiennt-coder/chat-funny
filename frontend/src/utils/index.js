export function pasteNotAllowFunc(id) {
    let myInput = document.getElementById(id);
    myInput.onpaste = (e) => e.preventDefault();
}
