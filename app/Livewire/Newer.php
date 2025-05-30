<?php

namespace App\Livewire;

use Livewire\Component;

class Newer extends Component
{
    #[Title('New Page')]
    public function render()
    {
        return view('livewire.newer');
    }
}
