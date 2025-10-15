import { NextResponse } from 'next/server';
import { getSheetData } from '@/lib/googleSheets';


const sheetsConfig = [
  { id: 'ID_SHEET_1', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_2', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_3', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_4', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_5', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_6', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_7', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_8', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_9', range: 'Hoja1!A1:Z100' },
  { id: 'ID_SHEET_10', range: 'Hoja1!A1:Z100' },
];

export async function GET() {
  try {
    const results = await Promise.all(
      sheetsConfig.map(cfg => getSheetData(cfg.id, cfg.range))
    );
    
    return NextResponse.json({ sheets: results });
  } catch (error) {
    let message = 'Error desconocido';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

