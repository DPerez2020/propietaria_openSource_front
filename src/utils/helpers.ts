export const ValidarCedula = (cedula: string) => {    
    const value = cedula.replace(/-/g,'');  
    const ced = value.slice(0, value.length - 1);  
    
    const verificador = value.slice(value.length - 1, 1);  
    let suma = 0;  
    let cedulaValida = 0;

    if(value.length < 11) { return false; } 

    for (let i=0; i < cedula.length; i++) {  
        let mod:number = 0;  
         if((i % 2) == 0){mod = 1} else {mod = 2}  
         let res = parseInt(ced.slice(i,1)) * mod;  
         if (res > 9) {  
              let resString = res.toString();  
              let uno = resString.slice(0,1);  
              let dos = resString.slice(1,1);  
              res = eval(uno) + eval(dos);  
         }  
         suma += res;  
    }  
    let el_numero = (10 - (suma % 10)) % 10;  
    if (el_numero.toString() == verificador && cedula.slice(0,3) != "000") {  
      cedulaValida = 1;
    }  
    else   {  
     cedulaValida = 0;
    }  
    return cedulaValida;
}