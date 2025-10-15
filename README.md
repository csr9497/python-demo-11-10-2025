# python-demo-11-10-2025
Demo for code interview 


```bash
    npm i
```

Se necesita un usurio de aws, se recomienda ingresar a AWS Console y IAM  crear un nuevo usuario

A la hora de crearlo se necesita agregarlo a un grupo, este grupo puede ser creado previamente o en el instante , selecione rol de "	
AdministratorAccess". Luego de todo crear usuario y en el apartado de 'credenciales de seguridad' se deben generar nuevas claves de acceso, en el panel hay un apartado donde se muestran las actuales. Al crear las llaves se necesita seleccionar en la etapa de 'caso de uso' la opcion de 'CLI' la cual nos permitira realizar comandos con AWS CLI. Luego de haberlas generados necesitamos los valores de 'clave de acceso' y 'clave de accesso secreta' , estos valores se deben copiar para luego introducirlos en los secrets que se usaran en github actions. Para setear secrets para las actions se necesitar ir a 'Settings', en el sidebar seleccion el item 'Secrets and Variables" y luego "Actions"  y ahi se podran agregar las secrets.




Se necesita establecer los siguientes secrets en github

- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY // 
- AWS_REGION // region
- LAMBDA_ARTIFACT_BUCKET // s3 