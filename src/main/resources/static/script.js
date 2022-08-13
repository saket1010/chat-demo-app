var stompClient=null

name=prompt("Enter name");
login(name);

function sendMessage(message){
    let jsonOb={
        name:localStorage.getItem("name"),
        content:message
    }
    stompClient.send("/reciveroommessage",{},JSON.stringify(jsonOb));
}

function connect()
{
    let socket=new SockJS("/connect")
    stompClient=Stomp.over(socket)
    stompClient.connect({},function(frame){
        console.log("Connected : "+frame);
        //subscribe
        stompClient.subscribe("/topic/sendroommessage",function(response){
            showMessage(JSON.parse(response.body))
        })
    })
}

function login(name)
{
    localStorage.setItem("name",name);
    connect();
}
function logout()
{
    localStorage.removeItem("name");
    if(stompClient!=null) {
        stompClient.disconnect();
    }
}
function showMessage(message)
{
    console.log(message.name+": message is"+message.content);
    var content=`<div class="d-flex justify-content-between">
                            <p class="small mb-1">${message.name}</p>
                            <p class="small mb-1 text-muted">${message.date}</p>
                        </div>
                        <div class="d-flex flex-row justify-content-start">
                            <img src="avtar.png"
                                 alt="avatar 1" style="width: 45px; height: 100%;">
                            <div>
                                <p class="small p-2 ms-3 mb-3 rounded-3" style="background-color: #f5f6f7;">${message.content}</p>
                            </div>
                        </div>`
    $('#message-content').append(content);


}
