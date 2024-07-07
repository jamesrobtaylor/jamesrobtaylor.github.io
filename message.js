const compliments = [
    "You are BEAUTIFUL!",
    "You are Smart!",
    "You are Funny!",
    "You are Kind!",
    "You are Amazing!",
    "You're my world!",
    "I'm lucky to have you in my life!",
    "You are Inspiring!",
    "You're My Best Friend!",
    "You're my favourite person",
    "I love you so much!",
    "I love you more than all the atoms in the universe!",
    "You're Perfect.",
    "Can't wait for our future",
    "Time disappears when we're together",
    "I'm not always h***y you're just always s**y :->",
    "I'll always be here for you",
    "Your eyes <3",
    "Oh yes Daddy!",
    "Naughty silly badgers",
    "ME + YOU = <3",
    "Your smile lights up the room",
    "You're the one :)",
    "You're my swan / pengiun",
    "I'm excited to spend my life with you <3",
    "Ur Pretty",
    "You make me a better person!",
    "You're the love of my life"
];

let loading = false;
let currentSet = 1;

const complimentElement = document.getElementById("compliment");
const refreshButton = document.getElementById("refresh-button");
const pictures = document.querySelectorAll('.picture');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');
const iframeContainer = document.getElementById("iframeContainer");
const video = document.getElementById("video");

function displayCompliment() {
    if (loading) return;
    loading = true;
    complimentElement.textContent = "Generating.";
    complimentElement.style.color = "white";
    complimentElement.style.fontSize = "20px";

    let dots = 0;
    const loadingInterval = setInterval(() => {
        dots = (dots + 1) % 4;
        complimentElement.textContent = "Generating" + ".".repeat(dots);
    }, 500);

    setTimeout(() => {
        clearInterval(loadingInterval);
        const randomIndex = Math.floor(Math.random() * compliments.length);
        const lightColors = ["#FFFFFF", "#FAFAD2", "#FFFACD", "#F0E68C", "#FFEFD5", "#FFE4B5"];
        const randomColor = lightColors[Math.floor(Math.random() * lightColors.length)];

        complimentElement.textContent = compliments[randomIndex];
        complimentElement.style.color = randomColor;
        complimentElement.style.boxShadow = "0 0 10px 10px white";
        pictures.forEach(pic => pic.style.boxShadow = "0 0 10px 10px " + (Math.random() < 0.5 ? "yellow" : "red"));
        loading = false;
    }, 3000);
}

function displayIframe(src) {
    video.src = src + "?autoplay=1";
    iframeContainer.style.display = "block";
}

function togglePictureSet() {
    pictures.forEach((pic, index) => {
        if (index < 3) {
            pic.style.display = currentSet === 1 ? "block" : "none";
        } else {
            pic.style.display = currentSet === 2 ? "block" : "none";
        }
    });
}

arrowLeft.addEventListener('click', () => {
    currentSet = 1;
    togglePictureSet();
});

arrowRight.addEventListener('click', () => {
    currentSet = 2;
    togglePictureSet();
});

refreshButton.addEventListener('click', displayCompliment);

pictures.forEach(pic => {
    pic.addEventListener('click', () => displayIframe(pic.dataset.video));
});

document.addEventListener('click', (event) => {
    if (!iframeContainer.contains(event.target) && event.target !== refreshButton) {
        iframeContainer.style.display = "none";
        video.src = "";
    }
});

window.addEventListener('load', () => {
    complimentElement.textContent = 'Click the heart to generate a message';
    togglePictureSet();
});
