const inputDia = document.querySelector('#dia')
const inputMes = document.querySelector('#mes')
const inputAno = document.querySelector('#ano')

const button = document.querySelector('#button')

const valorDia = document.querySelector('#day span')
const valorMes = document.querySelector('#month span')
const valorAno = document.querySelector('#year span')


//Informações das datas
const data = new Date();
const anoAtual = data.getFullYear();
const mesAtual = data.getMonth() + 1; // Meses em Js são representados de 0 a 11 então somei +1
//para ficar igual o calendário normal
const diaAtual = data.getDate()

//Função
const idadePessoa = () => {
    //Pegando a Idade da pessoa
    const anoNascimento = parseInt(inputAno.value) // valor que a pessoa coloca dentro do input de ano
    let idade = anoAtual - anoNascimento; // 2023 - 2004 = 19
    valorAno.innerText = idade;

    //Pegando o mês
    const mesNascimento = parseInt(inputMes.value) // valor que a pessoa coloca dentro do input de mês
    let meses;
    if(mesAtual >= mesNascimento) { // Ex: Mês atual é 10 e mês em que eu nasci é 6
        meses = mesAtual - mesNascimento; // 10 - 6 = 4
    }else {// Se mês de nascimento for maior que mês atual
        meses = 12 - (mesNascimento - mesAtual); // Mês 11 - mês atual 10 = 1 // 12 - 1 = 11
        idade--; // Como o mês de aniversário ainda não ocorreu, a idade subtrai 1
    }

    valorAno.innerText = idade // O valor da idade vai substituir a que tinha antes, Se o else ocorrer
    valorMes.innerText = meses 


    //Pegando o dia
    const diaNascimento = parseInt(inputDia.value) // Valor que a pessoa coloca dentro do input de dia
    const dias = diaAtual - diaNascimento // 31 - 10 = 21
    valorDia.innerText = dias
}


//Evento
button.addEventListener('click', () => {
    if(inputDia.value == '' || inputMes.value == '' || inputAno.value == '') {
        validationDay()
        validationMonth()
        validationYear()
    }else if(inputDia.value > 31 || inputMes.value > 12 || inputAno.value > anoAtual) {
        validationDay()
        validationMonth()
        validationYear()
    }else {
        //Verfica se a função validateDate é true, se for a função idadePessoa é executada
        if(validateDate()) {
            idadePessoa()
        }
    }
})

//Validação de formulário
const spanRequerid = document.querySelectorAll('.span-requerid');
const input = document.querySelectorAll('.requerid');
const label = document.querySelectorAll('.label-requerid');
const form = document.querySelectorAll('.form')

//Função de erro e validação
function setError(index, errorMensage) {
    input[index].style.border = '2px solid #e63636'
    spanRequerid[index].style.display = 'block'
    spanRequerid[index].textContent = errorMensage
    label[index].style.color = '#e63636'
}


function removeErro(index) {
    input[index].style.border = ''
    spanRequerid[index].style.display = 'none'
    label[index].style.color = ''
}

function validationDay() {
    if(inputDia.value === '') {
        setError(0, 'Campo Vazio')
    }else if(inputDia.value > 31) {
        setError(0, 'Dia Nulo')
    } else {
        removeErro(0)
    }
}

function validationMonth() {
    if(inputMes.value === '') {
        setError(1, 'Campo Vazio')
    }else if(inputMes.value > 12) {
       setError(1, 'Mês Nulo')
    }else {
        removeErro(1)
    }
}

function validationYear() {
    if(inputAno.value === '' ) {
        setError(2, 'Campo Vazio')
    }else if(inputAno.value > anoAtual ) {
        setError(2, 'Ano Nulo')
    }else {
        removeErro(2)
    }
}

function validateDate() {
    const selectedMonth = parseInt(inputMes.value);
    const selectedDay = parseInt(inputDia.value);

    if (selectedMonth === 2) {
        // Fevereiro (mês 2) pode ter no máximo 29 dias
        if (selectedDay > 29) {
            setError(0, 'Fevereiro tem no máximo 29 dias');
            return false;
        }
    } else if ([4, 6, 9, 11].includes(selectedMonth)) {
        // Abril (4), Junho (6), Setembro (9) e Novembro (11) têm no máximo 30 dias
        if (selectedDay === 31) {
            setError(0, 'Este mês não tem 31 dias');
            return false;
        }
    }
    removeErro(0);
    return true;
}

//Eventos de input
inputDia.addEventListener('input', validationDay)
inputMes.addEventListener('input', validationMonth)
inputAno.addEventListener('input', validationYear)









