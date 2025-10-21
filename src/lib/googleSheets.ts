/* 
// src/lib/googleSheets.ts
// Ejemplo de integración con Google Sheets API usando googleapis

import { google } from 'googleapis';
import cr from "@/lib/";

// Carga las credenciales del servicio (descarga el archivo JSON desde Google Cloud Console)
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

export async function getSheetData(spreadsheetId: string, range: string) {
  // Reemplaza la ruta con la ubicación de tu archivo de credenciales
  const credentials = import('../../credentials.json');
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  return response.data.values;
}

// Uso:
// const data = await getSheetData('ID_DE_TU_SHEET', 'Hoja1!A1:D10');

*/