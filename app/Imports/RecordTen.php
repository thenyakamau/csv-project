<?php

namespace App\Imports;

use App\RecordsTen;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;

class RecordTen implements ToModel, WithStartRow
{
    public function model(array $row)
    {
        return new RecordsTen([
            'ICD-10 code' => $row[1],
            'ICD-10 code descriptor' => $row[3],
            'ICD-10-AM Map' => $row[4],
            'ICD-10-AM code descriptor' => $row[7],
        ]);
    }

    /**
     * @return int
     */
    public function startRow(): int
    {
        return 2;
    }
}
