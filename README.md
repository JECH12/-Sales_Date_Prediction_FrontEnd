# -Sales_Date_Prediction_FrontEnd

Informacion relevante para ejecutar el proyecto.

Este proyecto de Angular se creo bajo la version de node.js 22.15.0 y angular 19.2.15, importante para realizar la instalacion de todos los paquetes necesarios del proyecto npm install.

Se creo una carpeta enviroment con un archivo con el mismo nombre al mismo nivel de app, en el cual se creo una variable que contiene la URL del API: "serviceUrlApi:"https://localhost:7034/api"
Es necesario cambiar esta URL por la proporcionaada al momento de compilar el backend, con la finalidad de ejercer la comunicacion entre proyectos correctamente.
El backend ya esta configurado para recibir peticiones desde localhost:4200 y evitar errores de cors.



Al tener un Backend ya realizado se abordo la aprueba punto por punto segun el test. 
Creando los componentes para listar los clientes y sus respectivas predicciones de futuro pedido.
Componente para visualizar las ordenes de un cliente.
Y componente para registrar un nuevo pedido.

Se uso signals, observables, formluarios reactivos, nuevas directivas de estructura(@if, @for) y angular material.
Se crearon interfaces para el correcto manejo de los datos.
Se crearaon servicios para ordenes, empleados, productos, transportadores y para el manejo de las peticiones HTTP.
Se configuraron un par de rutas y se crearon los modales solicitados.

Al ser angular 19 se utilizo componentes standAlone por defecto.

Me ha faltado el ultimo punto del test, me ha faltado un poco de tiempo para realizarlo.
Ofrezco una disculpa por ello.