document.getElementById("generate").addEventListener("click", generatePassword);
document.getElementById("length").addEventListener("input", function () {
    document.getElementById("lengthValue").textContent = this.value;
});

function generatePassword() {
    const length = document.getElementById("length").value;
    const useUppercase = document.getElementById("uppercase").checked;
    const useLowercase = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    let allChars = "";
    if (useUppercase) allChars += upperChars;
    if (useLowercase) allChars += lowerChars;
    if (useNumbers) allChars += numberChars;
    if (useSymbols) allChars += symbolChars;

    if (allChars === "") {
        alert("Please select at least one character type.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }
    
    document.getElementById("password").value = password;
    updateStrengthMeter(password);
}

function copyPassword() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    alert("Password copied to clipboard!");
}

function updateStrengthMeter(password) {
    const strengthMeter = document.getElementById("strengthValue");
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})");
    const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    
    if (strongRegex.test(password)) {
        strengthMeter.textContent = "Strong";
        strengthMeter.style.color = "green";
    } else if (mediumRegex.test(password)) {
        strengthMeter.textContent = "Medium";
        strengthMeter.style.color = "orange";
    } else {
        strengthMeter.textContent = "Weak";
        strengthMeter.style.color = "red";
    }
}
