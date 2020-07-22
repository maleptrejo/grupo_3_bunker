
// window.onload=function() {

    let listUsers= document.querySelector(".list-users")
    first_page:
    next_page:
    prev_page:
    last_page:

    function fetchUsers(url) {
        fetch(url)
        // fetch("http://localhost:3000/api/users")
        .then(function(respuesta) {

            if (respuesta.status==200) {
                return respuesta.json();
            }
            return Promise.reject('Error...')

        })
        .then(function(json){


            let users=json.data.rows;
            //  console.log(users[2])

            console.log(json.meta.pagination)

            // if (json.meta.pagination.next_page) {
            //     console.log('hay')

            // }else{
            //     console.log('no hay')
            // }

            listUsers.innerHTML="";

            for (let i=0; i< users.length; i++) {
               
                let th= "<th><img src= ../../images/usuarios/"+ users[i].avatar + "></th>";
                let td= "<td>" +users[i].email+ "</td>";

                let tr= "<tr>"+th + td+ "</tr>"

                listUsers.innerHTML+= tr;
                // document.querySelector(".list-users").innerHTML += tr;

            }

            let next=document.querySelector('#next')
            next.addEventListener('click', function(e){   
                listUsers.innerHTML="";
                fetchUsers( json.meta.pagination.next_page)
            })

            let prev=document.querySelector('#prev')
            prev.addEventListener('click', function(e){   
                listUsers.innerHTML="";
                console.log(json.meta.pagination.prev_page)
                fetchUsers( json.meta.pagination.prev_page)
            })

            let last=document.querySelector('#last')
           last.addEventListener('click', function(e){   
                listUsers.innerHTML="";
                fetchUsers( json.meta.pagination.last_page)
            })
        
           
       
        })
        .catch(error=>{
            let tr = document.createElement('tr')
            tr.classList.add('list-group-item', 'text-danger')
            tr.innerHTML = error
            listUsers.append(tr)
        })

    }

    fetchUsers("http://localhost:3000/api/users?start=0")

    // var counter= 0;
  
    // let next=document.querySelector('#next')

    // next.addEventListener('click', function(e){
    //     fetchUsers(json.meta.pagination.next_page)
    //     // e.preventDefault()
    //     // fetchUsers('http://localhost:3000/api/users/' + json.meta.pagination.next_page)
    // })

    // let next=document.querySelector('#next')

    // next.addEventListener('click', function(e){
    //     counter ++;
    //     console.log(counter)
    //     // fetchUsers("http://localhost:3000/api/users")
    //     // e.preventDefault()
    //     // fetchUsers('http://localhost:3000/api/users/' + json.meta.pagination.next_page)
    // })



// }