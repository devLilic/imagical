<?php

namespace App\Services\Parser;

trait Fragmentize {
    public function fragment($text, $startTag, $endTag = null): string
    {
        $start = stripos($text, $startTag) + strlen($startTag);

        // if $endTag is not null, then calculate length of substring to get
        $length = $endTag ? stripos($text, $endTag, $start) - $start : null;

        $result = substr($text, $start, $length);

        return trim($result);
    }

    public function to_sentence($string){
        $replacements = [
            "Ă" => "ă",
            "Ș" => "ș",
            "Î" => "î",
            "Ț" => "ț",
            "Ţ" => "ț",
            "Â" => "â",
        ];
        foreach ($replacements as $big => $small){
            $string = preg_replace("/$big/", $small, $string);
        }
        return trim(ucfirst(strtolower($string)));
    }
}
