import { decodeToken } from "react-jwt";

export const Decoder = (token) => {
    const decodedToken = decodeToken(token);
    return decodedToken;
}

export const errorCheck = (name, value) => {
    switch (name) {
        case 'name':
            if (! /[a-z]/gi.test(value) ) {
                return ("Formato de texto inválido"); 
            } else {
                return '';
            };
        case 'email':
            if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
                return "Email en formato inválido";
            } else {
                return '';
            }
        case 'password':
            if (value.length < 8) {
                return "Write 8 characters at least"
            } else {
                return '';
            }
        default:
            console.log("what are you sending to me????");
            break;
    }
}