<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="{{url('/assets/images/logo_main.png')}}" type="image/png">
    <link href="{{url('css/bootstrap.min.css')}}" rel="stylesheet" type="text/css">
    <link href="{{url('css/all.css')}}" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{{url('css/style.css')}}">
    <title>ICD Records</title>
</head>
<body>

    <div class="container mt-4">
        <h1 class="display-4 text-center">
            <i class="fas fa-book-open text-primary"></i> My<span class="text-primary">ICD</span
        >List
      </h1>

      <div class="search_bar">
          <div class="card drop_down" id="drop_down_id">
              <div class="drop_down_items">
                  <label id='search_label'>Something</label>
                <i class="fas fa-sort-down"></i></div>
          </div>
        <input type="text" class="form-group" id='search-bar' placeholder="Input code and press search....">
        <div class="card searh_button">
            <div class="search_button_items">
                <i class="fas fa-search"></i> 
            <label>Search</label>
            </div>
        </div>
      </div>

    </div>

    <script src="{{asset('js/main.js')}}" type="text/javascript"></script>
</body>
</html>