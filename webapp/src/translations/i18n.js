
import {eng} from './en/en'
import {esp} from './es/es'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
    .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
        en: {
            translation: {
                login: 'Log in',
                usuario: 'User',
                password: 'Password',
                botonLogin: 'ENTERS',
                enlaceLogin: 'You do not have an account? Sign up here.',
                email: 'Email',
                botonRegistro: 'SIGN UP',
                registro: 'SIGN UP',
                enlaceRegistro: 'Do you already have an account? Sign in here.',
                textoInicio: 'WELCOME TO WIQ',
                botonPartida: 'NEW GAME',
                toolInicio:'Start',
                toolHistorico:'Historical',
                toolPerfil:'Profile',
                toolRanking:'Ranking',
                toolLogOut:'Log out',
                textoHistorico: 'MY STATISTICS',
                textoPartJug: 'Games played',
                textoPregResp: 'Questions answered',
                textoAciertos: 'Successes',
                textoFallos: 'Failures',
                textoRatAc: 'Success rate',
                textoTiempo: 'Time played',
                textoTop: 'Top 3 users',
                creado: 'Created',
                textoPerfil: 'PROFILE',
                textoPersonalizar: 'Customize your game',
                textoNumPreg: 'Number of questions',
                textoTiempoPreg: 'Time available per question',
                textoTematicas: 'Select the topics of the question to be able to play',
                tematicaTodas: 'All',
                tematicaInf: 'Computing',
                tematicaGeo: 'Geography',
                tematicaCult: 'Culture',
                tematicaPersonajes: 'Characters',
                botonJugar: 'PLAY',
                textoTiempoRest: 'Time left: ',
                mensajeLogin: 'Successful login'
            }
        },
        es: {
            translation: {
                login: 'Inicia sesión',
                usuario: 'Usuario',
                password: 'Contraseña',
                botonLogin: 'ENTRA',
                enlaceLogin: '¿No tienes cuenta? Registrate aquí.',
                email: 'Email',
                botonRegistro: 'REGÍSTRATE',
                registro: 'REGÍSTRATE',
                enlaceRegistro: '¿Ya tienes cuenta? Inicia sesión aquí.',
                textoInicio: '¡BIENVENIDO A WIQ',
                botonPartida: 'NUEVA PARTIDA',
                toolInicio:'Inicio',
                toolHistorico:'Histórico',
                toolPerfil:'Perfil',
                toolRanking:'Ranking',
                toolLogOut:'Cerrar sesión',
                textoHistorico: 'MIS ESTADÍSTICAS',
                textoPartJug: 'Partidas jugadas',
                textoPregResp: 'Preguntas respondidas',
                textoAciertos: 'Aciertos',
                textoFallos: 'Fallos',
                textoRatAc: 'Ratio de acierto',
                textoTiempo: 'Tiempo jugado',
                textoTop: 'Top 3 usuarios',
                creado: 'Creado',
                textoPerfil: 'PERFIL',
                textoPersonalizar: 'Personaliza tu partida',
                textoNumPreg: 'Número de preguntas',
                textoTiempoPreg: 'Tiempo disponible por pregunta',
                textoTematicas: 'Selecciona las tematicas de la pregunta para poder jugar',
                tematicaTodas: 'Todas',
                tematicaInf: 'Informática',
                tematicaGeo: 'Geografía',
                tematicaCult: 'Cultura',
                tematicaPersonajes: 'Personajes',
                botonJugar: 'JUGAR',
                textoTiempoRest: 'Tiempo restante: ',
                mensajeLogin: 'Inicio de sesión correcto'
            }
        }
    }
    });

export default i18n;