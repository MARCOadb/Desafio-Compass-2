var passwordType = document.querySelector('.show-password')
var senha = document.querySelector('.field-password')
var email = document.querySelector('.field-email')
var showPassword = document.querySelector('.show')
var hidePassword = document.querySelector('.hide')
var btnLogin = document.querySelector('.btn-login')
var emailErrorMsg = document.querySelector('.email-error-msg')
var passwordErrorMsg = document.querySelector('.password-error-msg')

var users = [{
    name: 'Marco',
    email: 'marco@email.com',
    password: 'Marco19',
    occupation: 'student'
}, {
    name: 'Carlos',
    email: 'carlos@email.com',
    password: 'Carlos22',
    occupation: 'doctor'
}, {
    name: 'Marcelo',
    email: 'marcelo@email.com',
    password: 'Marcelo64',
    occupation: 'fire man'
}]


//confere informações de login
btnLogin.addEventListener('click', () => {

    testEmail()

    if (usuarioEncontrado) {
        usuario = testPassword()
    }


    if (usuarioEncontrado && senhaCorreta) {
        console.log('Olá ' + usuario + '!')
        window.location.href = "../pages/home.html"
    }
})

function testEmail() {
    //confere se email é válido
    let emailValido = validarEmail(email.value)

    if (emailValido) {
        console.log('email válido')
    } else {
        console.log('email inválido')
        showEmailError()
        email.value = ""
    }
    //confere se email está presente na lista de users
    let = usuarioEncontrado = false;
    for (var i = 0; i < users.length; i++) {
        if (email.value === users[i].email) {
            console.log('Usuário Encontrado!')
            usuarioEncontrado = true
            break
        }
        const teste = users[i].name
    }
    if (!usuarioEncontrado) {
        console.log('Usuário não encontrado')
        showEmailError()
    }
}

function testPassword() {
    //confere se a senha é válida
    let senhaValida = validarSenha(senha.value)
    if (senhaValida) {
        console.log('senha válida')
    } else {
        console.log('senha inválida')
        showPasswordError()
        senha.value = ""
    }

    //confere se a senha está correta
    let = senhaCorreta = false;
    for (var i = 0; i < users.length; i++) {
        if (senha.value === users[i].password) {
            console.log('Senha Correta!!')
            senhaCorreta = true
            return users[i].name
        }
    }
    if (!senhaCorreta) {
        console.log('Senha incorreta')
        showPasswordError()
        senha.value = ""
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

function showPasswordError() {
    passwordErrorMsg.classList.remove('hidden')
    passwordErrorMsg.classList.add('animate__shakeX')
    setTimeout(function () {
        passwordErrorMsg.classList.add('hidden')
    }, 3000)
}

passwordType.addEventListener('click', () => {
    event.preventDefault()
    if (senha.type === 'password') {
        senha.type = 'text'
        hidePassword.classList.remove('hidden')
        showPassword.classList.add('hidden')
    } else {
        senha.type = 'password'
        showPassword.classList.remove('hidden')
        hidePassword.classList.add('hidden')
    }
})