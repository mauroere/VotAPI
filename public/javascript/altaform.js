function onFileSelected(event) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        const fileName = event.target.files[0].name;

        //Leer archivo...
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = function() {
            $("#foto").val(reader.result);
            $("#fotoFile").val(fileName);
        }
    }
}