$(async function () {
    await allUsers();
});

async function allUsers() {
    const table = $('#bodyAllUserTable');
    table.empty()
    fetch("http://localhost:8080/api/admin")
        .then(r => r.json())
        .then(data => {
            data.forEach(user => {
                let users = `$(
                        <tr>
                            <td class="align-middle">${user.id}</td>
                            <td class="align-middle">${user.name}</td>
                            <td class="align-middle">${user.surname}</td>                         
                            <td class="align-middle">${user.age}</td>
                            <td class="align-middle">${user.email}</td>
                            <td class="align-middle">${user.roleSet.map(role => role.role).join(' , ').replaceAll("ROLE_", "")}</td>
                            <td class="align-middle">
                                <button type="button" class="btn btn-info" data-toggle="modal" id="buttonEdit" data-action="edit" data-id="${user.id}" data-target="#edit">Edit</button>
                            </td>
                            <td class="align-middle">
                                <button type="button" class="btn btn-danger" data-toggle="modal" id="buttonDelete" data-action="delete" data-id="${user.id}" data-target="#delete">Delete</button>
                            </td>
                        </tr>)`;
                table.append(users);
            })
        })
        .catch((error) => {
            alert(error);
        })
}
