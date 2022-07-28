<?php

namespace Tests\Feature;

use App\Services\Articles\Article;
use Facades\App\Services\Articles\ArticlesService;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ArticlesTest extends TestCase
{

    private string $code;

    protected function setUp(): void
    {
        parent::setUp();
        $this->code = Storage::disk('test')->get('1300.HTM');
    }

    /** @test */
    public function it_return_all_articles()
    {
        $this->assertIsArray(ArticlesService::all());
        ArticlesService::generate($this->code);
        $this->assertCount(14, ArticlesService::all());
    }

    /** @test */
    public function list_of_articles_contains_items_of_type_Article()
    {
        ArticlesService::generate($this->code);
        $articles = ArticlesService::all();
        dd($articles);
        $this->assertInstanceOf(Article::class, $articles[0]);
    }

    /** @test */
    public function it_finds_the_type_of_article()
    {
        ArticlesService::generate($this->code);
        $articles = ArticlesService::all();
        $this->assertEquals('BETA', $articles[0]->type);
    }
}
