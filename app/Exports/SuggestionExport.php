<?php

namespace App\Exports;

use App\Suggestion;
use Maatwebsite\Excel\Concerns\FromCollection;

class SuggestionExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Suggestion::all();
    }
}
