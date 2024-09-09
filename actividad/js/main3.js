function calcular() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let operacion = document.getElementById("operacion").value;
    let resultado;

    // Verificar que ambos números hayan sido ingresados
    if (isNaN(num1) || isNaN(num2)) {
      // Mostrar un mensaje si falta un número
      document.getElementById("resultado").innerText = "Por favor, ingresa ambos números.";
      return;  // Salir de la función si faltan números
    }

    //Se Realiza las operaciones con un switch
    switch (operacion) {
      case "+":
        resultado = num1 + num2;
        break;
      case "-":
        resultado = num1 - num2;
        break;
      case "*":
        resultado = num1 * num2;
        break;
      case "/":
        resultado = num1 / num2;
        // Validar que no se esté dividiendo por cero
        if (num2 === 0) {
          document.getElementById("resultado").innerText = "No se puede dividir por 0.";
          return;
        }
        resultado = num1 / num2;
        break;
      default:
        resultado = "Operación no válida";
    }

    // Mostrar el resultado
    document.getElementById("resultado").innerText = "Resultado: " + resultado;
  }

