function verify() {
    var nome = document.getElementById("nome").value
    var username = document.getElementById("username").value
    var nascimento = document.getElementById("nascimento").value
    var password = document.getElementById("senha").value
    var repetir_senha = document.getElementById("confirmar_senha").value

    if (username == '') {
        document.getElementById("erro-username").innerHTML = "Por favor, preencha este campo."
        document.getElementById("username").focus()
        return false
    } else {
        document.getElementById("erro-username").innerHTML = ""
    }
    if (password == '') {
        document.getElementById("erro-password").innerHTML = "Por favor, preencha este campo."
        document.getElementById("senha").focus()
        return false
    } else {
        document.getElementById("erro-password").innerHTML = ""
    }
    if (nome == '') {
        document.getElementById("erro-nome").innerHTML = "Por favor, preencha este campo."
        document.getElementById("nome").focus()
        return false
    } else {
        document.getElementById("erro-nome").innerHTML = ""
    }
    if (nascimento == '') {
        document.getElementById("erro-nascimento").innerHTML = "Por favor, preencha este campo."
        document.getElementById("nascimento").focus()
        return false
    } else {
        document.getElementById("erro-nascimento").innerHTML = ""
    }
    if (repetir_senha == '') {
        document.getElementById("erro-repetir_senha").innerHTML = "Por favor, preencha este campo."
        document.getElementById("repetir_senha").focus()
        return false
    } else {
        document.getElementById("erro-repetir_senha").innerHTML = ""
    }
}