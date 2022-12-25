$(document).ready(function () {
    $('#edit').on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        viewEditModal(id);
    })
})

async function viewEditModal(id) {
    //Получаем пользователя по id
    let userEdit = await getUser(id);
    let form = document.forms["formEditUser"];
    //Заполняем форму полученными данными
    form.id.value = userEdit.id;
    form.name.value = userEdit.name;
    form.surname.value = userEdit.surname;
    form.age.value = userEdit.age;
    form.email.value = userEdit.email;
    form.password.value = userEdit.password;

    $('#editRolesUser').empty();

    await fetch("http://localhost:8080/api/roles")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userEdit.roleSet.length; i++) {
                    if (userEdit.roleSet[i].role === role.role) {
                        selectedRole = true;
                        break;
                    }
                }
                let element = document.createElement("option");
                element.text = role.role.substring(5);
                element.value = role.id;
                if (selectedRole) element.selected = true;
                $('#editRolesUser')[0].appendChild(element);
            })
        })
        .catch((error) => {
            alert(error);
        })
}