<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;

class PeopleController extends EntityController
{
    protected $entityType = 'people';

    protected function getViewName()
    {
        return 'People/show';
    }

    public function show($id): Response
    {
        try {
          $headers = [
              'Accept' => 'application/json',
          ];
          $urlPeople = "https://swapi.dev/api/$this->entityType/$id";
          $responsePeople = Http::withHeaders($headers)->get($urlPeople);

          if ($responsePeople->successful()) {
              $person = $responsePeople->json();

              $responses = Http::pool(fn ($pool) => array_map(fn ($url) => $pool->get($url), $person['films']));

              $films = array_map(fn ($response) => $this->filterFilmProperties($response->throw()->json()), $responses);

              $peopleProperties = [
                  'id' => $id,
                  'name' => $person['name'],
                  'birth_year' => $person['birth_year'],
                  'gender' => $person['gender'],
                  'eye_color' => $person['eye_color'],
                  'hair_color' => $person['hair_color'],
                  'height' => $person['height'],
                  'mass' => $person['mass'],
                  'films' => $films,
              ];

              return Inertia::render($this->getViewName(), $peopleProperties);
          } else {
            return Inertia::render('Errors/ClientError', ['message' => $e->getMessage()]);
          }
        } catch (Throwable $e) {
          return Inertia::render('Errors/GeneralError', ['message' => $e->getMessage()]);
        }
    }

    private function filterFilmProperties($film)
    {
        $url = $film['url'] ?? '';
        $id = $this->extractIdFromUrl($url);

        return [
            'title' => $film['title'] ?? null,
            'id' => $id,
        ];
    }
}
