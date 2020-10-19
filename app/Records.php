<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Records extends Model
{
    //
    protected $fillable = ['ICD-9-BPA code', 'ICD-9-BPA code description', 'Valid ICD-9-BPA code', 'ICD-10-AM 1st edition code map 1', 'ICD-10-AM code description map 1','votes'];

}
