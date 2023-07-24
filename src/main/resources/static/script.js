var stompClient=null
var name=prompt("Enter name");
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
login(name);
function scrollToEnd(block, duration) {
    // if block not passed scroll to end of page
    block = block || $("html, body");
    duration = duration || 2000;

    // you can pass also block's jQuery selector instead of jQuery object
    if(typeof block === 'string') {
        block = $(block);
    }

    // if exists at list one block
    if (block.length) {
        block.animate({
            scrollTop: block.get(0).scrollHeight
        }, duration);
    }
}
function sendMessage(message){
    let jsonOb={
        name:name,
        content:message
    }
    if(message!="") {
        stompClient.send("/reciveroommessage", {}, JSON.stringify(jsonOb));
        document.getElementById("messagetxt").value="";
        scrollToEnd('#message-content');
    }
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
    let color="#f5f6f7";
    if(message.name==name)
    {
        color="skyblue";
    }
    console.log(message.name+": message is"+message.content);
    var content=`<div class="d-flex justify-content-between">
                            <p class="small mb-1">${message.name}</p>
                            <p class="small mb-1 text-muted">${message.date}</p>
                        </div>
                        <div class="d-flex flex-row justify-content-start">
                            <img src="avtar.png"
                                 alt="avatar 1" style="width: 45px; height: 100%;">
                            <div>
                                <p class="small p-2 ms-3 mb-3 rounded-3" style="background-color:${color};">${message.content}</p>
                            </div>
                        </div>`
    $('#message-content').append(content);
    scrollToEnd('#message-content');
}
