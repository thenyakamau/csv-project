<?php

namespace App\Exports;

use App\Suggestion;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class SuggestionExport implements FromCollection, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Suggestion::all();
    }

    public function headings(): array
    {
        return ["id", "ICD-9-BPA code", "ICD-9-BPA code Suggest", "ICD-9-BPA code description", "ICD-9-BPA code description Suggestion", "ICD-10-AM 1st edition code map 1", "ICD-10-AM 1st edition code map 1 Suggest", "ICD-10-AM code description map 1", "ICD-10-AM code description suggestion", "suggester Name", "suggester id", "Record Id", "Reason why", "Created at", "Updated at"];
    }
}
