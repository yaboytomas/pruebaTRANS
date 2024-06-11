$(document).ready(function() {
    var users = [];

    function validateForm() {
        var name = $('#name').val();
        var surname = $('#surname').val();
        var dob = $('#dob').val();
        var email = $('#email').val();
        var position = $('#position').val();
        var doj = $('#doj').val();

        if (!name || !surname || !dob || !email || !position || !doj) {
            alert('Todos los campos son obligatorios');
            return false;
        }

        if (users.some(user => user.email === email)) {
            alert('El correo electronico ya esta en uso');
            return false;
        }

        var dobDate = new Date(dob);
        dobDate.setFullYear(dobDate.getFullYear() + 18);
        if (new Date(doj) < dobDate) {
            alert('El trabajador no pudo ingresar antes de los 18 anos');
            return false;
        }

        return true;
    }

    $('#user-form').on('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        var name = $('#name').val();
        var surname = $('#surname').val();
        var dob = $('#dob').val();
        var email = $('#email').val();
        var position = $('#position').val();
        var doj = $('#doj').val();

        $('#confirmModalBody').html(`
            <p>Nombre y Apellido: ${name} ${surname}</p>
            <p>Correo electrónico: ${email}</p>
            <p>Cargo: ${position}</p>
            <p>Fecha de ingreso: ${doj}</p>
        `);

        $('#confirmModal').modal('show');
    });

    $('#confirmButton').on('click', function() {
        var name = $('#name').val();
        var surname = $('#surname').val();
        var dob = $('#dob').val();
        var email = $('#email').val();
        var position = $('#position').val();
        var doj = $('#doj').val();

        users.push({ name, surname, dob, email, position, doj });

        var userElement = $(`
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${name} ${surname}</h5>
                        <p class="card-text">${email}</p>
                        <p class="card-text">${position}</p>
                        <p class="card-text">${doj}</p>
                        <button class="btn btn-danger remove-button">Eliminar</button>
                    </div>
                </div>
            </div>
        `);

        userElement.find('.remove-button').on('click', function() {
            var index = users.findIndex(user => user.email === email);
            users.splice(index, 1);
            userElement.remove();
        });

        $('#user-list').append(userElement);

        $('#confirmModal').modal('hide');
    });
});