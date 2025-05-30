{
  description = "WHEELIN";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    flake-utils = {
      url = "github:numtide/flake-utils";
    };
  };

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


  outputs = { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        packages = {
          # default = cargoNix.rootCrate.build;
        };
        devShells.default = pkgs.mkShell {
          name = "laravel-devshell";

          nativeBuildInputs = with pkgs; [
            # TOOLS
            php
            php84Packages.composer
            laravel
            nodejs_22
            blade-formatter

            sql-studio
          ];

          shellHook = ''
            echo "Developing Meals on Wheels";
          '';

          # Environment variables
        };
      }
    );
}

