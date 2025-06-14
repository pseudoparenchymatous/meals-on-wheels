{
  description = "WHEELIN";

  inputs.nixpkgs.url = "nixpkgs/nixos-unstable";

  nixConfig = {
    extra-substituters = [
      "https://cache.nixos.org"
      "https://nix-community.cachix.org"
    ];
    extra-trusted-public-keys = [
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
    ];
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs {
      system = system;
      config.allowUnfree = true;
    };
  in {
    devShells.${system}.default = pkgs.mkShell {
      name = "laravel-devshell";

      nativeBuildInputs = with pkgs; [
        # TOOLS
        php
        php84Packages.composer
        laravel
        nodejs_22
        blade-formatter
        phpactor

        sql-studio
      ];

      shellHook = ''
        echo "Developing Meals on Wheels";
      '';

      # Environment variables
    };
  };
}

