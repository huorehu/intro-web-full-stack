<?php

class JsonDataController
{

    private $dataPath;

    public function __construct($dataPath)
    {
        $this->dataPath = $dataPath;
    }

    /**
     * Increase vote for particular item.
     * @param $itemOption - voted for item.
     * @return false|string
     */
    public function vote($itemOption)
    {
        $voteDataJson = json_decode(file_get_contents($this->dataPath), true);

        if ($voteDataJson === null) {
            $voteDataJson = $this->initDataJson();
        }

        if (!isset($voteDataJson[$itemOption])) {
            throw new InvalidArgumentException('This item does not exist!');
        }

        $voteDataJson[$itemOption]++;
        $voteDataJsonStr = json_encode($voteDataJson, JSON_PRETTY_PRINT);
        file_put_contents($this->dataPath, $voteDataJsonStr);

        return $voteDataJsonStr;
    }

    private function initDataJson()
    {
        return [
            'Work' => 0,
            'Eat' => 0,
            'Commute' => 0,
            'Watch TV' => 0,
            'Sleep' => 0
        ];
    }

}