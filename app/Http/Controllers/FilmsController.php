<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Http;

class FilmsController extends EntityController
{
    protected $entityType = 'films';

    protected function getViewName()
    {
        return 'Films/show';
    }

    public function show($id): Response
    {
        try {
          $headers = [
              'Accept' => 'application/json',
          ];
          $url = "https://swapi.dev/api/$this->entityType/$id";
          $response = Http::withHeaders($headers)->get($url);

          if ($response->successful()) {
              $film = $response->json();

              $responses = Http::pool(fn ($pool) => array_map(fn ($url) => $pool->get($url), $film['characters']));

              $people = array_map(fn ($response) => $this->filterPeopleProperties($response->throw()->json()), $responses);

              $filmProperties = [
                  'id' => $id,
                  'title' => $film['title'],
                  'opening_crawl' => $film['opening_crawl'],
                  'people' => $people,
              ];

              return Inertia::render($this->getViewName(), $filmProperties);
          } else {
            return Inertia::render('Errors/ClientError', ['message' => $e->getMessage()]);
          }
        } catch (Throwable $e) {
          return Inertia::render('Errors/GeneralError', ['message' => $e->getMessage()]);
        }
    }

    private function filterPeopleProperties($ppl)
    {
        $url = $ppl['url'] ?? '';
        $id = $this->extractIdFromUrl($url);

        return [
            'name' => $ppl['name'] ?? null,
            'id' => $id,
        ];
    }
}
