export const isCorrectUsername = (string) => {
  //El nombre de usuario debe ser alfanumerico
  //Puede tener los sig. caracteres: !#$&/?-_@
  const regex = /^[a-zA-Z0-9!#$&/?-_@]{1,9}$/;
  return regex.test(string);
};

export const isStrongPassword = (string) => {
  // La contraseña debe tener al menos 8 caracteres
  // Al menos un número
  // Al menos un símbolo (puedes ajustar la lista según tus requisitos)
  const regex = /^[a-zA-Z0-9!@#$%^&*_\-\/]{8,}$/;
  return regex.test(string);
};
