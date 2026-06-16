// Function to generate a random password
function generatePassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        // Pick a random index from the characters string
        const randomIndex = Math.floor(Math.random() * characters.length);
        // Append the character to the password
        password += characters.charAt(randomIndex);
    }
    
    return password;
}

// Generate and log a 12-character password
const newPassword = generatePassword(12);
console.log("Your random password is: " + newPassword);
