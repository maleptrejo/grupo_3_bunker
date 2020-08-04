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

                // if (users[i].customers != null) {
                    console.log(users[i])
                    let nombre;

                    if (users[i].customers == null) { 
                        
                        nombre = users[i].admins.name + " " + users[i].admins.surname ;
                    }else{
                        
                        nombre = users[i].customers.name + " " + users[i].customers.surname ;
                    }
                    

                    let th = "<th><img src= ../../images/usuarios/" + users[i].avatar + "></th>";
                    let td = "<td>" + users[i].email + "</td>";
                    let tdname="<td>"+nombre+"</td>"

                    if (users[i].customers == null) { 
                        tdLink=  "<td></td>";
                    }else{
                        tdLink=  "<td>" + "<a href=/users/customers/"+users[i].id + ">" + "<i class='far fa-address-card'></i>"+"</a>" + "</td>";
                    }


                   

                    let tr = "<tr>" + th + td + tdname +tdLink+ "</tr>"
                    listUsers.innerHTML += tr;

                // }

            }

          


            let old_next = document.querySelector('#next')
            let next =old_next.cloneNode(true)
            old_next.parentNode.replaceChild(next, old_next)
            
            next.addEventListener('click', function  (e) {

                    if(!json.meta.pagination.next_page){
                        console.log("estoy en null")
                    }
                    else {
                        listUsers.innerHTML = "";
                        console.log('voy a la pagina '+ json.meta.pagination.next_page )
                        fetchUsers(json.meta.pagination.next_page)
                    }

                   
               

            })


            let old_prev = document.querySelector('#prev')
            let prev =old_prev.cloneNode(true)
            old_prev.parentNode.replaceChild(prev, old_prev)

            prev.addEventListener('click', function (e) {
                 if(json.meta.pagination.prev_page==null) {
                     console.log('en null')
                 }else{
                    console.log('voy a la pagina '+ json.meta.pagination.prev_page)
                    listUsers.innerHTML = "";
                    fetchUsers(json.meta.pagination.prev_page)
                 }
            })

            

            let old_last = document.querySelector('#last')
            let last =old_last.cloneNode(true)
            old_last.parentNode.replaceChild(last, old_last)

            last.addEventListener('click', function (e) {
                listUsers.innerHTML = "";
                fetchUsers(json.meta.pagination.last_page)
            })



        })
        .catch(error => {
            console.log('error')
            let tr = document.createElement('tr')
            tr.classList.add('list-group-item', 'text-danger')
            tr.innerHTML = error
            listUsers.append(tr)
        })

}

fetchUsers("http://localhost:3000/api/users?start=0")