$(document).ready(function () {
    $('#delete').on("show.bs.modal", function (event) {
        const button = $(event.relatedTarget);
        const id = button.data("id");
        viewDeleteModal(id);
    })
})

async function viewDeleteModal(id) {
    //Получаем пользователя по id
    let userDelete = await getUser(id);
    let formDelete = document.forms["formDeleteUser"];
    //Заполняем форму полученными данными
    formDelete.id.value = userDelete.id;
    formDelete.name.value = userDelete.name;
    formDelete.surname.value = userDelete.surname;
    formDelete.age.value = userDelete.age;
    formDelete.email.value = userDelete.email;

    $('#deleteRolesUser').empty();

    await fetch("http://localhost:8080/api/roles")
        .then(r => r.json())
        .then(roles => {
            roles.forEach(role => {
                let selectedRole = false;
                for (let i = 0; i < userDelete.roleSet.length; i++) {
                    if (userDelete.roleSet[i].role === role.role) {
                        selectedRole = true;
                        break;
                    }
                }
                let element = document.createElement("option");
                element.text = role.role.substring(5);
                element.value = role.id;
                if (selectedRole) element.selected = true;
                $('#deleteRolesUser')[0].appendChild(element);
            })
        })
        .catch((error) => {
            alert(error);
        })
}

async function getUser(id) {

    let url = "http://localhost:8080/api/admin/" + id;
    let response = await fetch(url);
    return await response.json();
}