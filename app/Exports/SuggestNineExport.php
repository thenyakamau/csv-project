<?php

namespace App\Exports;

use App\SuggestionNine;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SuggestNineExport implements FromCollection, WithHeadings
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
        return ["id", "ICD-10 code",  "ICD-9 code suggest", "ICD-9 code descriptor", "ICD-9 code descriptor Suggestion", "ICD-10 Code", "ICD-10 Code suggest", "ICD-10 descriptor", "ICD-10 descriptor suggestion", "suggester Name", "suggester id", "Record Id", "Reason why", "Created at", "Updated at"];
    }
}
