<?php

namespace App\Exports;

use App\RecordsTen;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RecordTenExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return RecordsTen::all();
    }
    public function headings(): array
    {
        return ["id", "ICD-10 code",   "ICD-10 code descriptor",  "ICD-10-AM Map", "ICD-10-AM code descriptor", "Created at", "Updated at"];
    }
}
