const chatBox = document.getElementById("chat-box");

function addMessage(message,type){
    const div=document.createElement("div");

    const baseClasses = "p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl max-w-[85%] sm:max-w-[80%] lg:max-w-[75%] break-words text-sm sm:text-base lg:text-lg leading-relaxed";
    const userClasses = "bg-blue-600 ml-auto";
    const botClasses = "bg-gray-700";
    
    div.className=`message ${baseClasses} ${type === 'user' ? userClasses : botClasses}`;

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