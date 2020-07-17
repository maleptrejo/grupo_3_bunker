window.onload=function() { 
    
    fetch("http://localhost:3000/api/users")
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(json){
        let users=json.data.rows;
        //  console.log(users[2])
        
        console.log(json.meta.pagination)

        

        
        for (let i=0; i< users.length; i++) {

            let th= "<th><img src= ../../images/usuarios/"+ users[i].avatar + "></th>";
            let td= "<td>" +users[i].email+ "</td>";
    
            let tr= "<tr>"+th + td+ "</tr>"

            document.querySelector(".list-users").innerHTML += tr;
         
            
            // console.log(users[i])
            // let spanAvatar= "<img src= ../../images/usuarios/"+ users[i].avatar + ">";
            // let spanMail= "<span>" +users[i].email+ "</span>";
            
            // document.querySelector(".list-users").innerHTML += "<li>"+spanAvatar+ spanMail+ "</li>"
        }
    })
    
    
}