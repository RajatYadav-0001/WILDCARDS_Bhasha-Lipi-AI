function scrollToUpload() {
    document.getElementById("upload").scrollIntoView({ behavior: "smooth" });
}

function processImage() {
    const fileInput = document.getElementById("imageInput");
    const loading = document.getElementById("loading");
    const result = document.getElementById("result");

    if (fileInput.files.length === 0) {
        alert("Please upload an image first!");
        return;
    }

    loading.classList.remove("hidden");
    result.classList.add("hidden");

    // Fake AI processing simulation
    setTimeout(() => {
        loading.classList.add("hidden");
        result.classList.remove("hidden");

        document.getElementById("extractedText").innerText = "मेरा नाम राम है";
        document.getElementById("translatedText").innerText = "My name is Ram";

    }, 2000);
}

function playAudio() {
    const text = document.getElementById("translatedText").innerText;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}