const profileImg = document.querySelector('.profile-picture-img')
const profileInput = document.querySelector('.profile-picture-input')
const btnSave = document.querySelector('.btn-save')
const nome = document.querySelector('.field-name')
const occupation = document.querySelector('.field-occupation')
const email = document.querySelector('.field-email')
const password = document.querySelector('.field-password')
const passwordType = document.querySelector('.show-password')
const showPassword = document.querySelector('.show')
const hidePassword = document.querySelector('.hide')
const emailErrorMsg = document.querySelector('.email-error-msg')
const emailErrorMsg2 = document.querySelector('.email-error-msg-2')
const passwordErrorMsg = document.querySelector('.password-error-msg')
const fieldErrorMsg = document.querySelector('.field-error-msg')
const successMsg = document.querySelector('.success')

//Define Foto de perfil
profileInput.addEventListener('change', (e) => {
    const file = e.target.files[0]

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            profileImg.src = reader.result
        }
        reader.readAsDataURL(file)
    }
})

//Criação da classe user
class User {
    constructor(name, isActive, occupation, email, password, picture) {
        this.name = name;
        this.isActive = isActive
        this.occupation = occupation;
        this.email = email;
        this.password = password;
        this.picture = picture;
    }
}
//Carrega informações do localStorage
const localStorageUsersPC = JSON.parse(localStorage.getItem('localStorageUsers'))
if (localStorageUsersPC !== null) {
    for (let i = 0; i < localStorageUsersPC.length; i++) {
        localStorageUsersPC[i].isActive = false
    }
}
var users = localStorage.getItem('localStorageUsers') !== null ? localStorageUsersPC : []

//Botao Save
btnSave.addEventListener('click', () => {
    //TODOS OS CAMPOS SAO OBRIGATÓRIOS
    if (!nome.value || !occupation.value || !email.value || !password.value) {
        fieldError()
    } else {
        //Confere se email é usável
        const errorEmail = testEmail()

        if (errorEmail) {
            console.log('vish')
            email.value = ''
            return
        } else {
            //Confere se senha é usável
            let senhaValida = validarSenha(password.value)

            if (senhaValida) {
                //Cria user no localStorage
                var user = new User(
                    nome.value,
                    true,
                    occupation.value,
                    email.value,
                    password.value,
                    profileImg.src
                )
                users.push(user)
                localStorage.localStorageUsers = JSON.stringify(users)
                success()
            } else {
                showPasswordError()
                password.value = ""
            }
        }
    }

})

function testEmail() {
    //confere se email é válido
    let emailValido = validarEmail(email.value)
    let emailInvalido = false

    if (emailValido) {
        console.log('email válido')
    } else {
        console.log('email inválido')
        showEmailError()
        emailInvalido = true
        email.value = ""
        return emailInvalido
    }
    //confere se email está presente na lista de users
    let usuarioEncontrado = false;
    for (let i = 0; i < users.length; i++) {
        if (email.value === users[i].email) {
            console.log('Usuário já existente!')
            usuarioEncontrado = true
            showEmailError2()
            return usuarioEncontrado
        }
    }
    if (!usuarioEncontrado) {
        console.log('Usuário não encontrado')
    }
}

function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validarSenha(senha) {
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return senhaRegex.test(senha)
}

function showEmailError() {
    emailErrorMsg.classList.remove('hidden')
    emailErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        emailErrorMsg.classList.add('hidden')
    }, 3000)
}

function showEmailError2() {
    emailErrorMsg2.classList.remove('hidden')
    emailErrorMsg2.classList.add('animate__shakeX')
    setTimeout(function () {
        emailErrorMsg2.classList.add('hidden')
    }, 3000)
}

function showPasswordError() {
    passwordErrorMsg.classList.remove('hidden')
    passwordErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        passwordErrorMsg.classList.add('hidden')
    }, 5000)
}

function success() {
    successMsg.classList.remove('hidden')
    successMsg.classList.add('animate__bounceIn')
    setTimeout(function () {
        successMsg.classList.add('hidden')
        window.location.href = "../pages/home.html"
    }, 4000)
}

function fieldError() {
    fieldErrorMsg.classList.remove('hidden')
    fieldErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        fieldErrorMsg.classList.add('hidden')
    }, 4000)
}

//Função esconde e mostra senha
passwordType.addEventListener('click', (e) => {
    e.preventDefault()
    if (password.type === 'password') {
        password.type = 'text'
        hidePassword.classList.remove('hidden')
        showPassword.classList.add('hidden')
    } else {
        password.type = 'password'
        showPassword.classList.remove('hidden')
        hidePassword.classList.add('hidden')
    }
})