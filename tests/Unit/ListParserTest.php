<?php

namespace Tests\Unit;

use Facades\App\Services\Parser\ListParser;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ListParserTest extends TestCase {

    private string $code;

    protected function setUp(): void
    {
        parent::setUp();
        $this->code = Storage::disk('test')->get('1300.HTM');
    }

    /** @test */
    public function it_creates_a_list_of_titles()
    {
        $titles = ListParser::parse($this->code);

        $this->assertCount(14, $titles);
        $this->assertArrayHasKey('AUTORIZATIE RIBNITA', $titles);
    }
}
