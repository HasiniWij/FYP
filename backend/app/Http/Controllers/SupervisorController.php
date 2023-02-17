<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SupervisorController extends Controller
{ 
    public function index() {

        $supervisors =array(
                array(
                "name"=>'Jon Doe',
                "interests"=>'Data science, Web development'
            ),
                array(
                "name"=>'Ben Ten',
                "interests"=>'Data science, Web development'
            ),
                array(
                "name"=>'Lavinia Handerson',
                "interests"=>'Lavinia Handerson'
            )
        );
        print json_encode($supervisors);
     }
     public function create() {
        echo 'create';
     }
     public function store(Request $request) {
        echo 'store';
     }
     public function show($id) {
        echo 'show';
     }
     public function edit($id) {
        echo 'edit';
     }
     public function update(Request $request, $id) {
        echo 'update';
     }
     public function destroy($id) {
        echo 'destroy';
     }
}
