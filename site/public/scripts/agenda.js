let listUsers = document.querySelector(".list-users")


function fetchUsers(url) {
    fetch(url)
        // fetch("http://localhost:3000/api/users")
        .then(function (respuesta) {

            if (respuesta.status == 200) {
                return respuesta.json();
            }
            return Promise.reject('Error...')

        })
        .then(function (json) {


            let users = json.data.rows;
            //  console.log(users[2])



            listUsers.innerHTML = "";

            for (let i = 0; i < users.length; i++) {



                let th = "<th><img src= ../../images/usuarios/" + users[i].avatar + "></th>";
                let td = "<td>" + users[i].email + "</td>";


                let td2 = document.createElement('td')
                let a = document.createElement('a')
                a.setAttribute('href', '/')
                let icon = document.createElement('i')
                icon.classList.add('far')
                icon.classList.add('fa-address-card')
                a.append(icon)
                td2.append(a)



                // let tdname;

                // if (users[i].customers == null) {
                //     tdname = "<td>" + users[i].admins.name + " " + users[i].admins.surname + "</td>";
                // } else {
                //     tdname = "<td>" + users[i].customers.name + " " + users[i].customers.surname + "</td>";
                // }


                let tr = "<tr>" + th + td + tdname + "</tr>"

                listUsers.innerHTML += tr;


            }

            let next = document.querySelector('#next')
            next.addEventListener('click', function (e) {
                listUsers.innerHTML = "";
                fetchUsers(json.meta.pagination.next_page)
            })

            let prev = document.querySelector('#prev')
            prev.addEventListener('click', function (e) {
                listUsers.innerHTML = "";
                console.log(json.meta.pagination.prev_page)
                fetchUsers(json.meta.pagination.prev_page)
            })

            let last = document.querySelector('#last')
            last.addEventListener('click', function (e) {
                listUsers.innerHTML = "";
                fetchUsers(json.meta.pagination.last_page)
            })



        })
        .catch(error => {
            let tr = document.createElement('tr')
            tr.classList.add('list-group-item', 'text-danger')
            tr.innerHTML = error
            listUsers.append(tr)
        })

}

fetchUsers("http://localhost:3000/api/users?start=0")