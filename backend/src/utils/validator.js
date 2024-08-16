exports.isValidEmail = (email) => {
  // Regex para verificar o formato básico de um e-mail
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

exports.isValidPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}

exports.isValidName = (name) => {
  return (name.length >= 5) 
}