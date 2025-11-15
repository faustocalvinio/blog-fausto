---
external: false
draft: false
title: "Contrato de Renta en Solidity: Ejemplo Simple"
description: Un ejemplo sencillo de un contrato de renta implementado en Solidity, que permite a los inquilinos pagar la renta y al propietario retirar los fondos.
date: 2025-11-15
readingMinutes: '10'
---

# Contrato de Renta en Solidity: Variables y Estructuras Esenciales

Un contrato inteligente de renta en Solidity es una forma automatizada y transparente de gestionar acuerdos de alquiler en la blockchain. Este tipo de contrato elimina intermediarios y asegura que las transacciones se ejecuten automáticamente según las condiciones acordadas.

## ¿Qué necesita un contrato de renta para ser funcional?

Para que un contrato de renta sea funcional, necesita almacenar información clave y gestionar las interacciones entre el propietario y el inquilino. Veamos los elementos esenciales:

### Variables Principales

#### 1. **Direcciones (address)**

```solidity
address public propietario;
address public inquilino;
```

- **propietario**: Dirección de Ethereum del dueño de la propiedad
- **inquilino**: Dirección del arrendatario actual
- Estas direcciones son únicas e identifican a cada participante en la blockchain

#### 2. **Montos (uint)**

```solidity
uint public montoRenta;
uint public deposito;
uint public balance;
```

- **montoRenta**: La cantidad mensual que debe pagar el inquilino (en wei, la unidad más pequeña de Ether)
- **deposito**: El depósito de seguridad que el inquilino debe pagar al inicio
- **balance**: Los fondos actuales almacenados en el contrato

#### 3. **Control de Estado (bool y fechas)**

```solidity
bool public estaOcupada;
uint public fechaInicio;
uint public fechaUltimoPago;
```

- **estaOcupada**: Indica si la propiedad tiene un inquilino activo
- **fechaInicio**: Timestamp del inicio del contrato
- **fechaUltimoPago**: Timestamp del último pago recibido

### Estructuras de Datos Esenciales

#### Estructura para Pagos

```solidity
struct Pago {
    uint monto;
    uint fecha;
    address pagador;
    string concepto;
}

Pago[] public historialPagos;
```

Esta estructura permite mantener un registro de todos los pagos realizados, lo cual es útil para auditorías y seguimiento.

#### Estructura para el Inquilino

```solidity
struct DatosInquilino {
    address direccion;
    string nombre;
    uint fechaIngreso;
    uint depositoPagado;
    bool activo;
}

DatosInquilino public inquilinoActual;
```

Almacena información completa del inquilino actual.

## Ejemplo de Contrato Básico

Aquí está un ejemplo simple pero funcional de un contrato de renta:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContratoRenta {
    // Variables de estado principales
    address public propietario;
    address public inquilino;
    uint public montoRenta;
    uint public deposito;
    bool public estaOcupada;
    
    // Constructor: se ejecuta al desplegar el contrato
    constructor(uint _montoRenta, uint _deposito) {
        propietario = msg.sender; // quien despliega el contrato es el propietario
        montoRenta = _montoRenta;
        deposito = _deposito;
        estaOcupada = false;
    }
    
    // Modificador: solo el propietario puede ejecutar ciertas funciones
    modifier soloPropietario() {
        require(msg.sender == propietario, "Solo el propietario puede hacer esto");
        _;
    }
    
    // Función para que un inquilino pague el depósito y la primera renta
    function iniciarContrato() public payable {
        require(!estaOcupada, "La propiedad ya esta ocupada");
        require(msg.value == montoRenta + deposito, "Debe pagar la renta y el deposito");
        
        inquilino = msg.sender;
        estaOcupada = true;
    }
    
    // Función para pagar la renta mensual
    function pagarRenta() public payable {
        require(msg.sender == inquilino, "Solo el inquilino puede pagar la renta");
        require(msg.value == montoRenta, "Monto incorrecto");
        require(estaOcupada, "No hay contrato activo");
    }
    
    // Función para que el propietario retire los fondos
    function retirarFondos(uint _monto) public soloPropietario {
        require(address(this).balance >= _monto, "Fondos insuficientes");
        payable(propietario).transfer(_monto);
    }
    
    // Función para terminar el contrato
    function terminarContrato() public {
        require(msg.sender == inquilino || msg.sender == propietario, 
                "Solo el inquilino o propietario pueden terminar el contrato");
        
        // Devolver el depósito al inquilino
        if (address(this).balance >= deposito) {
            payable(inquilino).transfer(deposito);
        }
        
        estaOcupada = false;
        inquilino = address(0);
    }
    
    // Función para consultar el balance del contrato
    function obtenerBalance() public view returns (uint) {
        return address(this).balance;
    }
}
```

## Explicación de Componentes Clave

### Constructor
```solidity
constructor(uint _montoRenta, uint _deposito) {
    propietario = msg.sender;
    montoRenta = _montoRenta;
    deposito = _deposito;
    estaOcupada = false;
}
```

El constructor se ejecuta una sola vez cuando se despliega el contrato. Aquí se establecen:
- El propietario (quien despliega el contrato)
- El monto de la renta mensual
- El depósito requerido
- El estado inicial de la propiedad (desocupada)

### Modificadores (Modifiers)
```solidity
modifier soloPropietario() {
    require(msg.sender == propietario, "Solo el propietario puede hacer esto");
    _;
}
```

Los modificadores son reutilizables y verifican condiciones antes de ejecutar una función. En este caso, aseguran que solo el propietario pueda ejecutar ciertas acciones.

### Función Payable
```solidity
function pagarRenta() public payable {
    require(msg.value == montoRenta, "Monto incorrecto");
    // ...
}
```

La palabra clave `payable` permite que la función reciba Ether. `msg.value` contiene la cantidad enviada en la transacción.

### Require para Validaciones
```solidity
require(msg.sender == inquilino, "Solo el inquilino puede pagar la renta");
```

`require()` verifica condiciones. Si la condición es falsa, revierte la transacción y muestra el mensaje de error.

## Variables Especiales de Solidity

Solidity proporciona variables globales útiles:

- **msg.sender**: Dirección de quien llama la función
- **msg.value**: Cantidad de Ether enviada con la transacción (en wei)
- **address(this).balance**: Balance actual del contrato
- **block.timestamp**: Fecha/hora actual del bloque

## Tipos de Datos Importantes

### address
```solidity
address public propietario;
address payable public inquilino; // payable permite transferencias
```

Almacena direcciones de Ethereum (42 caracteres hexadecimales).

### uint (unsigned integer)
```solidity
uint public montoRenta; // equivalente a uint256
uint8 public mesesContrato; // de 0 a 255
```

Números enteros sin signo de diferentes tamaños (uint8, uint16, uint256, etc.).

### bool
```solidity
bool public estaOcupada;
```

Valor booleano: true o false.

### string
```solidity
string public direccionPropiedad;
```

Cadenas de texto en formato UTF-8.

### mapping
```solidity
mapping(address => uint) public balanceInquilinos;
```

Estructura de datos tipo clave-valor, similar a un diccionario.

## Resumen

Para que un contrato de renta en Solidity sea funcional necesitas:

1. **Variables de dirección**: Para identificar al propietario y al inquilino
2. **Variables numéricas**: Para montos de renta, depósitos y balances
3. **Variables de estado**: Para controlar si la propiedad está ocupada
4. **Funciones payable**: Para recibir pagos
5. **Modificadores**: Para controlar permisos de acceso
6. **Validaciones con require**: Para asegurar que las condiciones se cumplan
7. **Eventos (opcional)**: Para registrar actividades importantes en la blockchain

Este contrato simple puede expandirse con funcionalidades adicionales como:
- Pagos automáticos mensuales
- Multas por pagos tardíos
- Sistema de reputación
- Resolución de disputas
- Mantenimiento y reparaciones

La blockchain garantiza transparencia total, inmutabilidad de los términos acordados y ejecución automática sin intermediarios.
