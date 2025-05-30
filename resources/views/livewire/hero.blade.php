<?php

use function Livewire\Volt\{state};

//

?>

<div class="flex flex-wrap items-center justify-center gap-10">
  <div class="grid grid-rows-3 max-w-md items-center justify-items-center lg:justify-items-start">
    <flux:heading level="1" size="xl" class="">Nourishing Lives, One Meal at a Time</flux:heading>
    <flux:text size="xl" class="">MerryMeal delivers nutritious meals to elderly and vulnerable adults — because everyone deserves a hot meal and a helping hand.</flux:text>
    <div class="grid grid-cols-2 gap-5 items-center">
      <flux:button href="#">Donate Now</flux:button>
      <flux:link href="#">Request a Meal <flux:icon.arrow-right-circle class="inline" /></flux:link>
    </div>
  </div>
  <div class="max-w-150">
    <img class="" src="{{ asset('hero-image.jpg') }}" alt="" >
  </div>
</div>
