# Alarma de Robo

Este es el repositorio del proyecto "Alarma de Robo", diseñado para proteger tu dispositivo y alertarte en caso de intento de robo.

![Pantallas_Alarma](https://github.com/LeanCabeza/alarma-de-robo/assets/60674663/ba6d030b-2b88-43df-97bb-af9691b3e373)


## Requisitos

1. Ingresar un usuario registrado en la base de datos.

2. La aplicación tendrá un único botón que ocupará toda la pantalla y permitirá activar y desactivar el detector de robo.

3. Una vez activado, asumiendo que el dispositivo está apoyado horizontalmente sobre una mesa, se activarán las siguientes funciones:

   - Al cambiar la posición a la izquierda o a la derecha, la aplicación emitirá un sonido distinto para cada lado.
   - Al poner el dispositivo en posición vertical, se encenderá la luz durante 5 segundos y se emitirá un sonido.
   - Al poner el dispositivo en posición horizontal, vibrará durante 5 segundos y emitirá otro sonido.

4. Para desactivar la alarma, se pedirá el ingreso de una contraseña que deberá coincidir con la contraseña utilizada en el ingreso. Si no coincide, la aplicación emitirá sonidos, vibrará y encenderá la luz simultáneamente durante 5 segundos.

5. Los sonidos utilizados en la aplicación se pueden grabar.

### Grabación de Sonidos

Ejemplo de sonidos predefinidos:
- Al mover el dispositivo hacia la izquierda: "¡Están hurtando el dispositivo!"
- Al mover el dispositivo hacia la derecha: "¡Epa! ¿Qué estás por hacer?"
