<?php

use function Livewire\Volt\{state};

$features = [];

$features[] = [
    'title' => 'Nutritious Meals',
    'body' => 'Carefully prepared meals tailored to dietary needs',
    'icon' => "<flux:icon.heart />",
];

$features[] = [
    'title' => 'Door Delivery',
    'body' => 'Fresh meals delivered right to your doorstep',
    'icon' => "<flux:icon.truck />",
];

$features[] = [
    'title' => 'Community Support',
    'body' => 'Powered by volunteers who care about your wellbeing',
    'icon' => "<flux:icon.user-group />",
];
state([
  'features' => $features,
]);

?>

<section class="py-10 px-7">
  <flux:heading class="text-center" level="2" size="xl">Our Service</flux:heading>
  <div class="py-5">
    <div class="flex justify-center gap-4">
      @foreach ($features as $index => $feature)
        <livewire:feature.card :feature="$feature" :key="$index"/>
      @endforeach
    </div>
  </div>
</section>
