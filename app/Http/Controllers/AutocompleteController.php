<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\JsonResponse;

class AutocompleteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $queryParams = $request->query();
            $url = "https://swapi.dev/api/$request->entity/";
            $headers = [
                'Accept' => 'application/json',
            ];

            $response = Http::withHeaders($headers)->get($url, $queryParams);

            if ($response->successful()) {
                return response()->json($response->json());
            } else {
                return response()->json(['error' => 'Unable to fetch data'], $response->status());
            }
        } catch (RequestException $e) {
            return response()->json(['error' => 'Request failed: ' . $e->getMessage()], 500);
        }
        
    }
}