<?php

namespace App\Services\Parser;

class TextParser implements ParserInterface {

    use Fragmentize;

    public $code;

    public function parse($code)
    {
        $this->code = $code;

        return $this;
    }

    public function get_title_for($slugs)
    {
        if (count($slugs) === 3){
            $html1 = $this->fragment($this->code, "<a name=" . $slugs[1] . ">", "<FONT 000000 SIZE=-2>");
            $html2 = $this->fragment($this->code, "<a name=" . $slugs[2] . ">", "<FONT 000000 SIZE=-2>");
            $html = strlen($html1) > strlen($html2) ? $html1 : $html2;
        }else{
            $slug = collect($slugs)->pop();
            $html = $this->fragment($this->code, "<a name=" . $slug . ">", "<FONT 000000 SIZE=-2>");
        }

        $content = explode("\r\n", strip_tags($this->fragment($html, '<p>')));
        if(preg_match("/MD|RO /", $content[0])){
            $title = $this->clear_title($content[1]);
        } else {
            $title = $this->clear_title($content[0]);
        }
        return trim($title);
    }

    public function get_content_for($slugs)
    {
        $slug = collect($slugs)->shift();

        $html = $this->fragment($this->code, "<a name=" . $slug . ">", "<FONT 000000 SIZE=-2>");
        $content = explode("\r\n", strip_tags($this->fragment($html, '<p>')));

        return $content[0];
    }

    protected function clear_title($title){
        return preg_replace("/TITLU: |TITLU /", "", strtoupper($title));
    }

    public function getTitle()
    {
        if (strlen($this->code) > 10) {
            $rows = explode("\r\n", $this->code);
            $title_1 = preg_replace("/TITLU:/", "", $rows[0]);
            $title_2 = preg_replace("/TITLU:/", "", $rows[1]);
            return strlen($title_1) < strlen($title_2) ? $title_1 : $title_2;
        }
        return '';
    }
}
