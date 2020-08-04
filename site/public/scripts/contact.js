

let listContact= document.querySelector(".list-messages")


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



        // if (json.meta.pagination.next_page) {
        //     console.log('hay')

        // }else{
        //     console.log('no hay')
        // }

        listContact.innerHTML="";



        for (let i=0; i< messages.length; i++) {

            let td= "<td>" + messages[i].email+ "</td>";
            let td1= "<td>" + messages[i].name + " " + messages[i].surname + "</td>";
            let td2= "<td>" + messages[i].message + "</td>";

            // let td3= `<td><a href= "../api/contact/${messages[i].id}" value="${messages[i].id}" > <i class="fab fa-readme"></i> </a></td>`;
            let td3= `<td><a href= "../contact/${messages[i].id}" value="${messages[i].id}" > <i class="fab fa-readme"></i> </a></td>`;
            let tr= "<tr>" + td + td1 + td2 + td3 +"</tr>";

            listContact.innerHTML+= tr;
           // href= "../api/contact/${messages[i].id}"
        }


        let old_next = document.querySelector('#next')
        let next =old_next.cloneNode(true)
        old_next.parentNode.replaceChild(next, old_next)

      
        next.addEventListener('click', function(e){

            if(!json.meta.pagination.next_page){
              
            }
            else {
                listContact.innerHTML="";
                fetchContact( json.meta.pagination.next_page)
            }

        })

        let old_prev = document.querySelector('#prev')
            let prev =old_prev.cloneNode(true)
            old_prev.parentNode.replaceChild(prev, old_prev)

       
        prev.addEventListener('click', function(e){
           

            if(json.meta.pagination.prev_page==null) {
                
            }else{
                listContact.innerHTML="";
                console.log(json.meta.pagination.prev_page)
                fetchContact( json.meta.pagination.prev_page)
            }



        })

        let old_last = document.querySelector('#last')
        let last =old_last.cloneNode(true)
        old_last.parentNode.replaceChild(last, old_last)

       
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