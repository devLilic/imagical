<?php

namespace App\Services\Articles;

use Facades\App\Services\Parser\TextParser;
use Facades\App\Services\Parser\ListParser;

class ArticlesService {

    protected $articles = [];
    protected $html;

    public function all()
    {
        return $this->articles;
    }

    public function generate($htmlCode)
    {
        $this->html = $htmlCode;
        $titles = ListParser::parse($this->html)->get();
        foreach ($titles as $search => $slugs) {
            $this->articles[] = new Article($search, $slugs);
        }

        $this->updateContent();

        return $this->articles;
    }

    public function updateContent()
    {
        if ($this->articles) {
            foreach ($this->articles as $article) {
                $article->title = TextParser::parse($this->html)->get_title_for($article->slugs);
                $article->content = TextParser::parse($this->html)->get_content_for($article->slugs);
            }
        }
    }

}
