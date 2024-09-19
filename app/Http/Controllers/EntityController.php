<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

abstract class EntityController extends Controller
{
    protected $entityType;

    abstract protected function getViewName();

    abstract public function show($id): Response;
    
    protected function extractIdFromUrl($url)
    {
        $segments = explode('/', rtrim($url, '/'));
        return end($segments);
    }
}