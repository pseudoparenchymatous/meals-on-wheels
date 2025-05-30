<?php

use function Livewire\Volt\{mount, state};
use Illuminate\Support\Facades\Blade;

state('feature');

?>

<div class="rounded-lg bg-zinc-100 dark:bg-zinc-800 p-5">
  <div class="">
    <div class="flex flex-wrap items-center gap-2 p-2">
      <div class="w-8 h-8 inline-flex items-center justify-center rounded-full bg-accent text-white flex-shrink-0">
        {!! Blade::render($feature["icon"]) !!}
      </div>
      <flux:heading level="3">{{ $feature["title"] }}</flux:heading>
    </div>
    <flux:text class="p-2">{{ $feature["body"] }}</flux:text>
  </div>
</div>
