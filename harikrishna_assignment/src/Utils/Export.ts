import  * as XLSX from "xlsx";
import type { Transaction } from "../Types/mockTransactionType";

export function exportToExcel ( data : Transaction[]){
    const formatted = data.map( (t)=>({
        Date : t.date,
        Title : t.title,
        Amount : t.amount,
        Type : t.type,
        Category : t.category,
    }));


    const sheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook,sheet,"Transactions_Data");
    XLSX.writeFile(workbook,"finance-data.xlsx")

}