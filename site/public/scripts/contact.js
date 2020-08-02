console.log("estoy corriendo")

let listContact= document.querySelector(".list-messages")
first_page:
next_page:
prev_page:
last_page:

function fetchContact(url) {
    fetch(url)
    .then(function(res) {

        if (res.status==200) {
            return res.json();
        }
        return Promise.reject('Error...')

    })
    .then(function(json){


        let messages=json.data.rows;
        //  console.log(users[2])

        console.log(json.meta.pagination)

        // if (json.meta.pagination.next_page) {
        //     console.log('hay')

        // }else{
        //     console.log('no hay')
        // }

        listContact.innerHTML="";

        console.log(messages)

        for (let i=0; i< messages.length; i++) {
        
            let td= "<td>" + messages[i].email+ "</td>";
            let td1= "<td>" + messages[i].name + " " + messages[i].surname + "</td>";
            let td2= "<td>" + messages[i].message + "</td>";
            let td3= `<td><button class="td-fav" ><a href= "../api/contact/${messages[i].id}" value="${messages[i].id}" class="btn message-borrar"> Borrar </button></a></td>`;
            let tr= "<tr>" + td + td1 + td2 + td3 +"</tr>";

            listContact.innerHTML+= tr;
           // href= "../api/contact/${messages[i].id}"
        }

        


        let next=document.querySelector('#next')
        next.addEventListener('click', function(e){   
            listContact.innerHTML="";
            fetchContact( json.meta.pagination.next_page)
        })

        let prev=document.querySelector('#prev')
        prev.addEventListener('click', function(e){   
            listContact.innerHTML="";
            console.log(json.meta.pagination.prev_page)
            fetchContact( json.meta.pagination.prev_page)
        })

        let last=document.querySelector('#last')
       last.addEventListener('click', function(e){   
            listContact.innerHTML="";
            fetchContact( json.meta.pagination.last_page)
        })
    
       
   
    })
    .catch(error=>{
        let tr = document.createElement('tr')
        tr.classList.add('list-group-item', 'text-danger')
        tr.innerHTML = error
        listContact.append(tr)
    })

}

fetchContact("http://localhost:3000/api/contact?start=0")