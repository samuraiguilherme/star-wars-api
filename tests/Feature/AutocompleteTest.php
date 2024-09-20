<?php

namespace Tests\Feature;

use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class AutocompleteTest extends TestCase
{
    public function test_making_an_api_request(): void
    {
        $response = $this->getJson('/autocomplete/people?search=ae');

        $response
            ->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
                $json->has('next')
                    ->has('previous')
                    ->where('count', 2)
                    ->has('results.0', fn (AssertableJson $json) =>
                        $json->where('name', 'Saesee Tiin')
                            ->where('height', '188')
                            ->where('gender', 'male')
                            ->etc()
                    )
            );
    }
}
