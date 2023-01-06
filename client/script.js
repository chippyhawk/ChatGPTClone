import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

//Targeting form
const form = document.querySelector("form");
const chatConainer = document.querySelector("#chat_container");

//This is the variable for the (...) loading indicating when a question is being asked and the computer is busy thinking
let loadInterval;

//Function that will load our messages
function loader(element) {
  element.textContent = ""; //Empty Content
  loadInterval = setInterval(() => {
    element.textContent += "."; //Every 3 seconds. A dot will be added

    if (element.textContent === "....") {
      //If element === (....) it will be reset back to ()
      element.textContent = "";
    }
  }, 300);
}

//Typing functionality

function typeText(element, text) {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    }
    clearInterval(interval);
  }, 20);
}

function generateUniqueID() {
  //This generates a random/Unique ID
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);
  return `id-${timestamp}-${hexadecimalString}`;
}

//This is each chat Stripe
function chatStripe(isAi, value, uniqueID) {
  return `
    <div class="wrapper ${isAi && "ai"}>
      <div class="chat">
        <div class="profile"> 
          <img 
            src = "${isAi ? bot : user}"
            alt = "${isAi ? "bot" : "user"}"
          />
        </div>
        <div class="message" id=${uniqueID}>
          ${value}
        </div>
      </div>
    </div>  
  `;
}

const handleSubmit = async (e) => {
  e.preventDefault(); //Preventing browser from reloading
  const data = new FormData(form);
  //Users chat stripe
  chatConainer.innerHTML += chatStripe(false, data.get("prompt"));
  form.reset();

  //Bots chat stripe
  const uniqueID = generateUniqueID();
  chatConainer.innerHTML += chatStripe(true, " ", uniqueID);

  chatConainer.scrollTop = chatConainer.scrollHeight; //This allows for scrolling as message is being typed

  const messageDiv = document.getElementById(uniqueID);

  loader(messageDiv);
};

//Calling Handle submit
form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});

console.log(`Hello World`);
