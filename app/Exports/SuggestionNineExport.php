<?php

namespace App\Exports;

use App\SuggestionNine;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SuggestionNineExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return SuggestionNine::all();
    }

    public function headings(): array
    {
        return ["id", "ICD-9 code",  "ICD-10 code suggest", "ICD-10 code descriptor", "ICD-10-code", "ICD-10-code suggest", "Short_title", "Short_title suggestion", "suggester Name", "suggester id", "Record Id", "Reason why", "Created at", "Updated at"];
    }
}
