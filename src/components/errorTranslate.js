const errorDict = {
    "field required": "Campo requerido",
    "value is not a valid email address": "El email no es válido",
    "email length is less than 10": "El email no puede tener menos de 10 caracteres",
    "email length is greater than 100": "El email puede tener como mucho 100 caracteres",
    "username must be a nonempty alphanumeric string": "El username debe ser alfanumérico y no vacío",
    "ensure this value has at most 50 characters": "Asegurate que el valor tiene como mucho 50 caracteres",
    "ensure this value has at most 35 characters": "Asegurate que el valor tiene como mucho 35 caracteres",
    "ensure this value has at least 8 characters": "Asegurate que el valor tiene al menos 8 caracteres",
    "ensure this value has at least 5 characters": "Asegurate que el valor tiene al menos 5 caracteres",
    "spaces not allowed in password": "No se permiten espacios en la contraseña",
    "password was not valid": "La contraseña no es válida",
    "passwords don't match": "Las contraseñas no coinciden",
    "old_password was not valid": "La contraseña no es válida",
    "new_password was not valid": "La contraseña nueva no es válida",
    "new_password can not be equal to old_password": "La contraseña nueva no puede ser la misma que la anterior",
    "new passwords don't password match": "Las contraseñas nuevas no coinciden",
    "Could not register the user": "No se pudo registrar al usuario",
    "Could not open and read default icon file": "No se pudo abrir y leer alguno de los avatars por defecto",
    "Passwords provided didn't match": "Las contraseñas no coinciden",
    "Failed to update icon. Formats allowed: jpeg, png, bmp, webp": "No se puede modificar el avatar. Formatos permitidos: jpeg, png, bmp, webp",
    "Failed to update icon. Largest size allowed is 2 MB": "No se puede modificar el avatar. Tamaño máximo permitido es 2 MB",
    "Incorrect email or password": "Contraseña o email incorrectos",
    "Not authenticated": "Usuario no autenticado",
    "Expired signature, you need to login again": "Token expirado. Inicia sesión nuevamente para continuar",
    "Invalid JWT token": "Token JWT es inválido",
    "Could not validate credentials": "No se pudieron validar las credenciales provistas",
    "User not found": "El usuario no existe",
    "Game not found": "La partida no existe",
    "Player not found": "El jugador no existe",
    "The player is not in the game": "El jugador no está en la partida",
    "The user is already in game": "El usuario ya está en la partida",
    "The game must have at least 5 players": "La partida debe tener al menos 5 jugadores",
    "The game must have less than 10 players": "La partida puede tener como mucho 10 jugadores",
    "The game has not reach the minimum amount of players": "La partida no ha alcanzado la cantidad mínima de jugadores",
    "You cant start the game, you are not the owner!": "Sólo el creador puede iniciar la partida",
    "The game has reach the maximum amount of players": "La partida ha alcanzado la máxima cantidad de jugadores",
    "The game has started": "La partida ha comenzado",
    "The game has finished": "La partida ha finalizado",
    "The game has not been deleted": "La partida no ha sido eliminada",
    "Game hasn't started": "La partida no ha comenzado",
    "The minimum of players is higher than the maximum": "La cantidad mínima de jugadores es mayor que la cantidad máxima",
    "The amount of players is inconsistent to assign roles": "La cantidad de jugadores es inconsistente con los roles asignados",
    "There are no games available": "No hay partidas disponibles",
    "Player is not in this game": "El jugador no está en esta partida",
    "Player is dead": "El jugador está muerto",
    "Player already voted": "El jugador ya ha votado",
    "Vote's missing": "Aún faltan votos!",
    "Already taken the cards in this turn": "Las cartas ya han sido tomadas",
    "Cards were not taken by minister in this turn": "Las cartas no fueron tomadas",
    "No turn started yet": "Ningún turno ha comenzado aún",
    "Director already promulgated in this turn": "El director ya ha promulgado",
    "Player is not minister": "El jugador no es el ministro",
    "Must promulgate in current turn before execute a spell": "Se debe ejecutar una promulgación antes de ejecutar un hechizo",
    "The requirements to cast the spell are not met": "Los requisitos para lanzar/invocar el hechizo no han sido satisfechos",
    "Player has been already investigated": "El jugador ya ha sido investigado",
    "A spell is available and need to be used before start of next turn": "Un hechizo está disponible y debe ser ejecutado antes de pasar al siguiente turno",
    "Already set director candidate in current turn": "Ya se ha elegido un candidato a director durante este turno",
    "The type of the card to discard is invalid": "El tipo de carta a descartar es inválido", 
    "Player is not director": "El jugador no es el director",
    "Card was not discarded": "La carta no pudo ser descartada",
    "Expelliarmus was already set in current turn": "Expelliarmus ya fue activado durante este turno",
    "Expelliarmus requires 5 death eater promulgations": "Expelliarmus requiere 5 promulgaciones de mortífagos",
    "Director didnt propose a Expelliarmus": "El director no ha propuesto un Expelliarmus",
    "Consent already given": "Ya se ha dado permiso"
}

const errorTranslate = (errorString) => {
    const translatedString = errorDict[errorString]
    if (translatedString) {
        return translatedString
    }
    return errorString
}

export default errorTranslate;