document.getElementById('signUpForm').addEventListener('submit', function(event) {
    if (event.isDefaultPrevented()) {
        sformError();
        ssubmitMSG(false, "Please fill all fields!");
    } else {
        event.preventDefault();
        ssubmitForm();
    }
});

import Ajv from 'ajv';
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "account": {
            "type": "string"
        },
        "username": {
            "type": "string"
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string"
        },
    },
    "required": ["username", "email", "password"]
};

const validate = ajv.compile(schema);

function ssubmitForm() {
    var email = document.getElementById('semail').value;
    var username = document.getElementById('sname').value;
    var password = document.getElementById('spassword').value;

    // Validate form data against schema
    const formData = { email, username, password }; // Form data to validate
    const valid = validate(formData); // Validate form data against schema

    if (!valid) {
        console.error('Form data is not valid:', validate.errors);
        alert('Form data is not valid:', validate.errors);
        // Handle validation errors
        return;
    }

    const requestBody = {
        account: 'admin',
        username: username,
        email: email,
        password: password,
    };

    fetch('https://my-brand-ken-ganza-1.onrender.com/v1/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.text())
    .then(text => {
        if (text === "success") {
            sformSuccess();
        } else {
            sformError();
            ssubmitMSG(false, text);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



function sformSuccess() {
    document.getElementById('signUpForm').reset();
    ssubmitMSG(true, "Sign Up Submitted!");
}

function sformError() {
    document.getElementById('signUpForm').classList.add('shake', 'animated');
    document.getElementById('signUpForm').addEventListener('animationend', function() {
        this.classList.remove('shake', 'animated');
    });
}

function ssubmitMSG(valid, msg) {
    var smsgSubmit = document.getElementById('smsgSubmit');
    smsgSubmit.textContent = msg;
    if (valid) {
        smsgSubmit.classList.add('h3', 'text-center', 'tada', 'animated');
    } else {
        smsgSubmit.classList.add('h3', 'text-center');
    }
}
