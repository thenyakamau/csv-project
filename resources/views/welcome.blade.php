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
           
                <select class="form-control drop_down_items" id="category-selector">
                  <option value="ICD-9-BPA code">ICD-9</option>
                  <option value="ICD-10-AM 1st edition code map 1">ICD-10</option>
                </select>
            
          </div>
        <input type="text" class="form-group" id='search-bar' placeholder="Input code and press search....">
        <div class="card searh_button" id='search_button'>
            <div class="search_button_items">
                <i class="fas fa-search"></i> 
            <label>Search</label>
            </div>
        </div>

      </div>
      <div class="card">
        <div class="card-header">Search Tips</div>
        <div class="card-body">
            Use the switch on the the search box to toggle between ICD-9 and ICD-10 codes. 
            You may type the entire code or a fraction of the code into the search box for results. 
            The initial data is to give a concept of how the data should seem plus dummy searches.
          </div>
    </div>

    <div class="card mt-4">
        <div class="card-header records_header">
            <h4>Records</h4>
            <label>Go TO</label>
        </div>
        <div class="card-body">
            <table class="table table-striped">
                <thead>
                  <tr>
                    <th>ICD-9</th>
                    <th>Description</th>
                    <th></th>
                    <th>ICD-10</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody id="record-list"></tbody>
              </table>
        </div>
    </div>

    </div>

    <script src="{{asset('js/main.js')}}" type="text/javascript"></script>
</body>
</html>