<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecordsTen extends Model
{
    //
    protected $fillable = ['ICD-10 code', 'ICD-10 code descriptor', 'ICD-10-AM Map', 'ICD-10-AM code descriptor','votes'];

}
