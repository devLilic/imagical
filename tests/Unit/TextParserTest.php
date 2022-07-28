<?php

namespace Tests\Unit;

use Facades\App\Services\Articles\TextParser;
use Facades\App\Services\Articles\Articles;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class TextParserTest extends TestCase
{

    private $code;

    protected function setUp(): void
    {
        parent::setUp();
        $this->code = Storage::disk('test')->get('1800.htm');
    }

    /** @test */
    public function it_returns_part_of_string()
    {
        $html = Storage::disk('test')->get('file.html');

        $code = TextParser::parse($html);
        $result = $code->getSubstring($html, 2, 8);

        $this->assertEquals("34567", $result);
    }

    /** @test */
    public function it_returns_title_for_article()
    {
        $slugs = [
            'RO POMPIERI GRECIA OFF-INTRO',
            'RO POMPIERI GRECIA OFF-OFF',
            'RO POMPIERI GRECIA OFF-SNC'
        ];
        $title = TextParser::parse($this->code)->get_title_for($slugs);

        $this->assertEquals('POMPIERI ROMÂNI ÎN MISIUNE ÎN GRECIA', $title);
    }
}
