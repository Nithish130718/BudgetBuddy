// Javascript file for the chatbot page 
// Bot responses have not been integrated and can be integrated based on the api that is to be used.

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;
const API_KEY = "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";

const createElement = (html, className) => {
            // create new div and apply chat, specified class and set html content of div
            const chatDiv = document.createElement("div");
            chatDiv.classList.add("chat",className);
            chatDiv.innerHTML = html;
            return chatDiv;   // Return the created chat Div
        }

const getchatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai/com/v1/completions";
    const pElement = document.createElement("p");

    // define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userText,
            max_tokens : 2048,
            temperature: 0.2,
            top_p: 1,
            n: 1,
            stop: null
        })
    }

    try{
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch(error){
        console.log(error);
    }

    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
}

const showTypingAnimation = () => {
    const html = `<div class = "chat-content">
                    <div class = "chat-details">
                        <img src = "static/images/chatbot1.png" alt = "chatbot-img">
                            <div class = "typing-animation">
                                <div class = "typing-dot" style="--delay: 0.2s"></div>
                                <div class = "typing-dot" style="--delay: 0.3s"></div>
                                <div class = "typing-dot" style="--delay: 0.4s"></div>
                            </div>
                    </div>
                    <span class = "material-icons"> content_copy </span>
                    </div>`;

            // create an outgoing chat div with the user's message and append it to the chat container
            const incomingChatDiv = createElement(html, "incoming");
            chatContainer.appendChild(incomingChatDiv);
            getchatResponse(incomingChatDiv);
}

const handleOutgoingChat = () => {
            userText = chatInput.value.trim();    // get chat input value and remove extra spaces
            if (!userText) return;

            const html = `<div class="chat-content">
                            <div class="chat-details">
                                <img src= "static/images/user.png" alt="user-img">
                                <p></p>
                            </div>
                        </div>`;
        
            // create an outgoing chat div with the user's message and append it to the chat container
            const outgoingChatDiv = createElement(html, "outgoing");
            outgoingChatDiv.querySelector("p").textContent = userText;
            chatContainer.appendChild(outgoingChatDiv);
            setTimeout(showTypingAnimation, 500);
        }
        
sendButton.addEventListener("click",handleOutgoingChat);
