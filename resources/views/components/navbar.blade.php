<flux:header container class="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
  <flux:sidebar.toggle class="lg:hidden" icon="bars-2" inset="left" />

  <flux:brand href="#" logo="{{ asset('meals-on-wheels-logo.svg') }}" name="Meals on Wheels" class="max-lg:hidden dark:hidden" />
  <flux:brand href="#" logo="{{ asset('meals-on-wheels-logo.svg') }}" name="Meals on Wheels" class="max-lg:hidden! hidden dark:flex" />

  <flux:navbar class="-mb-px max-lg:hidden">
    <flux:navbar.item href="#" current>Home</flux:navbar.item>
    <flux:navbar.item href="#">Meals</flux:navbar.item>
    <flux:navbar.item href="#">Contact</flux:navbar.item>
    <flux:navbar.item href="#">Get Involved</flux:navbar.item>
  </flux:navbar>
  <flux:button x-data x-on:click="$flux.dark = ! $flux.dark" icon="moon" variant="subtle" aria-label="Toggle dark mode" />

  <flux:spacer />

  <flux:dropdown class="max-lg:hidden">
    <flux:navbar.item icon:trailing="chevron-down">
      <flux:icon.user />
    </flux:navbar.item>

    <flux:navmenu>
      <flux:navmenu.item href="#">Register</flux:navmenu.item>
      <flux:navmenu.item href="#">Login</flux:navmenu.item>
    </flux:navmenu>
  </flux:dropdown>


</flux:header>

<flux:sidebar stashable sticky class="lg:hidden bg-zinc-50 dark:bg-zinc-900 border rtl:border-r-0 rtl:border-l border-zinc-200 dark:border-zinc-700">
  <flux:sidebar.toggle class="lg:hidden" icon="x-mark" />

  <flux:brand href="#" logo="https://fluxui.dev/img/demo/logo.png" name="Acme Inc." class="px-2 dark:hidden" />
  <flux:brand href="#" logo="https://fluxui.dev/img/demo/dark-mode-logo.png" name="Acme Inc." class="px-2 hidden dark:flex" />

  <flux:navlist variant="outline">
    <flux:navlist.item icon="home" href="#" current>Home</flux:navlist.item>
    <flux:navlist.item icon="inbox" badge="12" href="#">Inbox</flux:navlist.item>
    <flux:navlist.item icon="document-text" href="#">Documents</flux:navlist.item>
    <flux:navlist.item icon="calendar" href="#">Calendar</flux:navlist.item>

    <flux:navlist.group expandable heading="Favorites" class="max-lg:hidden">
      <flux:navlist.item href="#">Marketing site</flux:navlist.item>
      <flux:navlist.item href="#">Android app</flux:navlist.item>
      <flux:navlist.item href="#">Brand guidelines</flux:navlist.item>
    </flux:navlist.group>
  </flux:navlist>

  <flux:spacer />

  <flux:navlist variant="outline">
    <flux:navlist.item icon="cog-6-tooth" href="#">Settings</flux:navlist.item>
    <flux:navlist.item icon="information-circle" href="#">Help</flux:navlist.item>
  </flux:navlist>
</flux:sidebar>
