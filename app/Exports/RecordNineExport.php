<?php

namespace App\Exports;

use App\RecordNine;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RecordNineExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        //
        return RecordNine::all();
    }
    public function headings(): array
    {
        return ["id", "ICD-9 code",  "ICD-9 code descriptor",  "ICD-10 Code", "ICD-10 descriptor", "Created at", "Updated at"];
    }
}
