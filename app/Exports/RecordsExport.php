<?php

namespace App\Exports;

use App\Records;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class RecordsExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Records::all();
    }

    public function headings(): array
    {
        return ["id", "ICD-9-BPA code",  "ICD-9-BPA code description", 'Valid ICD-9-BPA code', "ICD-10-AM 1st edition code map 1", "ICD-10-AM code description map 1", "Created at", "Updated at"];
    }
}
