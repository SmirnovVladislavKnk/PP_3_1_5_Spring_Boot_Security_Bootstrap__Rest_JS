$(async function () {
    await loadUser();
});

async function loadUser() {
    fetch("http://localhost:8080/api/user")
        .then(r => r.json())
        .then(data => {
            $('#navUsername').append(data.email);
            let roles = data.roleSet.map(role => " " + role.role.substring(5));
            $('#navRoles').append(roles);

            let user = `$(
            <tr>
                <td class="align-middle">${data.id}</td>
                <td class="align-middle">${data.name}</td>
                <td class="align-middle">${data.surname}</td>
                <td class="align-middle">${data.age}</td>
                <td class="align-middle">${data.email}</td>
                <td class="align-middle">${roles}</td>)`;
            $('#userPanelBody').append(user);
        })
        .catch((error) => {
            alert(error);
        });
}




