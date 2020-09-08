@extends('layouts.app')

@section('content')
   <div class="container-sm">
    @if (session('success'))
    <div data-form-alert="true">
        <div
          data-form-alert-success="true"
          class="alert alert-form alert-success text-xs-center"
        >
        {{session('success')}}
        </div>
      </div>
    @else
    <div data-form-alert="true">
        <div
          data-form-alert-success="true"
          class="alert alert-form alert-warning text-xs-center"
        >
        {{session('message')}}
        </div>
      </div>
    @endif
    <div class="card">
        <div class="card-header"><h4>Upload the csv file</h4></div>
        <div class="card-body card_display">
            
            <h1 class="display-4 text-center">
                <i class="fas fa-cloud-upload-alt text-primary"></i>
                <span class="text-primary">Upload File</span>
          </h1>
        <form action="{{url('/admin/import')}}" method="post" enctype="multipart/form-data">
            {{ csrf_field() }}
            <label class="text-primary">Upload Ic9 to Ic10 csv files</label>
            <input name="file" type="file" class="form-group" id="file_input">
            <label class="text-primary">Upload Ic10 to Ic10A csv files</label>
            <input name="file_ic10" type="file" class="form-group" id="file_input">
            <button type="submit" class="btn btn-lg btn-block btn-primary upload_button">Upload</button>
        </form>

        </div>
    </div>
   </div>

   @endsection