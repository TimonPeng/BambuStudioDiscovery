# BambuStudioDiscovery [![GitHub Release](https://img.shields.io/github/v/release/hardfury-labs/BambuStudioDiscovery)](https://github.com/hardfury-labs/BambuStudioDiscovery/releases)

**BambuStudioDiscovery** allows adding Bambu Lab 3D printers by IP address to appear in Bambu Studio or Orca Slicer, even if they cannot be automatically detected.

It also enables connection to printers located on different subnets, accessible external networks (such as via VPN).

## Demo

![Demo](./screenshots/demo.gif)

## Download

[Download the release](https://github.com/hardfury-labs/BambuStudioDiscovery/releases)

## Requirements

Nothing special.

## Platforms

- macOS
- Windows
- Linux Ubuntu

## Development

### Install dependencies

```bash
pnpm install
```

### Run the app

```bash
pnpm app:dev
```

## References

- [Bambu Lab P1S on IoT VLAN](https://nuxx.net/blog/2024/12/19/bambu-lab-p1s-on-iot-vlan/)
- [Printer Network Ports](https://wiki.bambulab.com/en/general/printer-network-ports)
