/// PARA INICIAR EL SERVIDOR.-
1- Abrir una terminal
2- Ubicarse en la carpeta del proyecto
3- Correr el siguiente código: '   pnpm run start:dev   '

Opcion con Docker:
...
3- Correr el siguiente código: " docker-compose up mysql_server" para la BD
y para el servidor node hay que hacer "npm install -g pnpm", luego "pnpm install" dentro de la carpeta del proyecto, y finalmente "pnpm run start:dev".

21/08.- Se puede probar con "pnpm start" en lugar de "pnpm run start:dev"
Para compilar el TypeScript es: "pnpm run build"



# VolquetesLosHermanos
La empresa "Volquetes Los Hermanos" nos contacta para llevar a cabo la gestion de alquileres y cobranzas de sus volquetes.

Cuando se realiza la entrega de un volquete debe quedar registrado la fecha y hora en la que se entrega, el cliente al cual se lleva
y el medio de pago optado por el cliente. 

En caso de que el medio de pago sea una transferencia es necesario saber si se realizó la factura o no.

Se necesita llevar a cabo un registro del estado de cada uno de los volquetes, una vez que fue entregado, el mismo pasa a estado "Entregado",
cuando el cliente realiza el pago "Cobrado" y cuando se realiza el retiro "Retirado".

	1. Los Volquetes se encuentran codificados por un numero unico.
	2. Los Volquetes pueden ser de diferentes tamaños (Mediano, Grande o Chico).
	2. Los Clientes cuentan con un nro cliente, Nombre, Apellido, nro telefono y Direccion.
	


Ademas se interesa llevar a cabo un registro de los gastos realizados indicando, fecha gasto, tipo de gasto y monto.
