const chatBox = document.getElementById("chat-box");


function addMessage(message,type){

    const div=document.createElement("div");

    div.className=`message ${type}`;

    div.innerText=message;

    chatBox.appendChild(div);

    chatBox.scrollTop=chatBox.scrollHeight;

}



async function sendMessage(){

    const input=document.getElementById("message");

    const text=input.value.trim();


    if(!text) return;


    addMessage(text,"user");

    input.value="";


    addMessage("Thinking...","bot");


    try{

        const response = await fetch(
            "http://localhost:5000/chat",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    message:text
                })

            }
        );


        const data=await response.json();


        document.querySelector(".bot:last-child").remove();


        addMessage(
            data.reply,
            "bot"
        );


    }
    catch(error){

        addMessage(
            "Sorry, something went wrong.",
            "bot"
        );

        console.log(error);

    }

}