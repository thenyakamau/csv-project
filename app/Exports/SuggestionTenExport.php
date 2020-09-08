<?php

namespace App\Exports;

use App\SuggestionTen;
use Maatwebsite\Excel\Concerns\FromCollection;

class SuggestionTenExport implements FromCollection
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return SuggestionTen::all();
    }
}
