<?php

class JsonDataController
{

    private $dataPath;

    public function __construct($dataPath)
    {
        $this->dataPath = $dataPath;
    }

    public function vote($itemNumber)
    {
        $voteDataJson = json_decode(file_get_contents($this->dataPath), true);

        if ($voteDataJson === null) {
            $voteDataJson = $this->initDataJson();
        }

        $voteDataJson[$itemNumber]++;
        $voteDataJsonStr = json_encode($voteDataJson, JSON_PRETTY_PRINT);
        file_put_contents($this->dataPath, $voteDataJsonStr);

        return $voteDataJsonStr;
    }

    public function getData()
    {
        return json_decode(file_get_contents($this->dataPath));
    }

    private function initDataJson() {
        return [
            'Option-1' => 0,
            'Option-2' => 0,
            'Option-3' => 0,
            'Option-4' => 0,
            'Option-5' => 0
        ];
    }

}