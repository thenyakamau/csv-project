@extends('layouts.app')

@section('content')
   <div class="container-sm">
    <div class="card">
        <div class="card-header"><h4>Upload the csv file</h4></div>
        <div class="card-body card_display">
            <h1 class="display-4 text-center">
                <i class="fas fa-cloud-upload-alt text-primary"></i>
                <span class="text-primary">Upload File</span>
          </h1>
        <form action="{{url('/admin/import')}}" method="post" enctype="multipart/form-data">
            {{ csrf_field() }}

            @if (session('success'))
                {{session('success')}}
            @endif
            <input name="file" type="file" class="form-group" id="file_input">
            <button type="submit" class="btn btn-lg btn-block btn-primary upload_button">Upload</button>
          </form>
        </div>
    </div>
   </div>

   @endsection