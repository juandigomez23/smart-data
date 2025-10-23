declare module "@e965/xlsx" {
  type WorkSheet = unknown;
  type WorkBook = unknown;
  interface XLSXType {
    utils: {
      book_new(): WorkBook;
  json_to_sheet(data: unknown[], opts?: { header?: string[] }): WorkSheet;
      book_append_sheet(wb: WorkBook, ws: WorkSheet, name: string): void;
    };
    write(wb: WorkBook, opts?: { bookType?: string; type?: string }): ArrayBuffer | Uint8Array | string;
  }
  const XLSX: XLSXType;
  export default XLSX;
}
