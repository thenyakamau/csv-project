@extends('layouts.app')

@section('content')

    <div class="welcome_layout">
      <div class="container mt-5">
        <center><h1>CLINICAL CLASSIFICATION MAPPING SYSTEM</h1></center>
       
        <p>Clinical classifaction systems such as ICD(International Classifaction of Diseases)developed by WHO,
          have been used for many years to code clinical data for various statistical analysis purposes. 
          This coded data is used not only nationally but also internationally to compare clinical data around the world. 
          Over the years,the clinical Classification systems have changed,with various versions developed.Also,countries extend the clinical 
          classification systems for the needs of their own country.In this project,you are expected to work on mapping the codes that are 
          in the US clinical classification code version ICD_10_AM(for diseases) and ACHI(for interventions).
          The only common link between these classification systems is the mapping files to the international standard ICD_10.
          Therefore using these existing flat_file maps,you are expected  to create a mapping between ICD_9 US version and ICD_10 Australian version  
        </p>
        <center>
         
          <a href="/search" class='btn btn-primary btn-lg link_button'> <i class="fas fa-search"></i> Search</a>
        </center>
      </div>
    </div>
@endsection