<?php

namespace App\Exports;

use App\SuggestionTen;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SuggestionTenExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return SuggestionTen::all();
    }

    public function headings(): array
    {
        return ["id", "ICD-10 code",   "ICD-10 code descriptor", "ICD-10 code descriptor Suggestion", "ICD-10-AM Map", "ICD-10-AM code descriptor", "ICD-10-AM code descriptor suggestion", "suggester Name", "suggester id", "Record Id", "Reason why", "Created at", "Updated at"];
    }
}
