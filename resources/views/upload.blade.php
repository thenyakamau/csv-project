<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{url('css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
    <link href="{{url('css/all.css')}}" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{{url('css/style.css')}}">
    <title>ICD Records</title>
</head>
<body>
   <div class="container-sm mt-4">
    <div class="card">
        <div class="card-header"><h4>Upload a file</h4></div>
        <div class="card-body card_display">
            <h1 class="display-4 text-center">
                <i class="fas fa-cloud-upload-alt text-primary"></i>
                <span class="text-primary">Upload File</span>
          </h1>
        <form action="{{url('/import')}}" method="post" enctype="multipart/form-data">
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
</body>
</html>